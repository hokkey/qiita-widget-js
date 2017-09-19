import * as QiitaResponse from './QiitaResponse';
import * as Util from './Util';

export interface QiitaPresenterParam {
  useShuffle?: boolean;
  sortByLike?: boolean;

  userTemplate?: string;
  userDest?: string;
  articleTemplate?: string;
  articleDest?: string;

  max?: number;
}

interface QiitaPresenterConf {
  useShuffle: boolean;
  sortByLike: boolean;

  userTemplate: string;
  userDest: string;
  articleTemplate: string;
  articleDest: string;

  max: number;
}

interface FragmentCreator {
  (template: HTMLTemplateElement): DocumentFragment;
}

export class QiitaPresenter {

  static defaultConf: QiitaPresenterConf = {
    useShuffle: false,
    sortByLike: false,

    userDest: '#qiita-user',
    userTemplate: '#qiita-user-tpl',
    articleDest: '#qiita-article',
    articleTemplate: '#qiita-article-tpl',

    max: 5
  };

  articles: QiitaResponse.Article[];
  user: QiitaResponse.User;

  private conf: QiitaPresenterConf;

  private userTemplate: HTMLTemplateElement;
  private articleTemplate: HTMLTemplateElement;

  private userDest: HTMLElement;
  private articleDest: HTMLElement;

  constructor(conf: QiitaPresenterParam) {

    this.articles = [];
    this.user = null;
    this.conf = Object.assign({}, QiitaPresenter.defaultConf, conf);

    this.userTemplate = <HTMLTemplateElement>document.querySelector(this.conf.userTemplate);
    this.userDest = <HTMLElement>document.querySelector(this.conf.userDest);

    this.articleTemplate = <HTMLTemplateElement>document.querySelector(this.conf.articleTemplate);
    this.articleDest = <HTMLElement>document.querySelector(this.conf.articleDest);
  }

  countAllLikes(): number {
    return this.articles.reduce((prev: number, item: QiitaResponse.Article): number => {
      return prev + item.likes_count; }, 0);
  }

  renderUser(): void {
    const callback: FragmentCreator = (template) => {
      const fragment: DocumentFragment = document.importNode(template.content, true);
      Object.entries(this.user).forEach((kv: any[]) => {
        this.fillTemplate(fragment, kv);
      });
      return fragment;
    };

    this.renderView(this.userTemplate, this.userDest, callback);
  }

  renderArticles(): void {
    const callback: FragmentCreator = (template) => {
      const fragment = document.createDocumentFragment();

      // Shuffle articles
      let list = this.conf.useShuffle ?
        Util.shuffleArray<QiitaResponse.Article>(this.articles) :
        this.articles.concat()
      ;

      // Slice articles
      list = list.slice(0, this.conf.max);

      // Sort articles
      list = this.conf.sortByLike ?
        Util.sortArray(list, 'likes_count') :
        list
      ;

      list.forEach((item: QiitaResponse.Article) => {
        // Except privates
        if (item.private) return;

        fragment.appendChild(this.createArticleFragment(template, item));
      });

      return fragment;
    };

    this.renderView(this.articleTemplate, this.articleDest, callback);
  }

  private renderView(template: HTMLTemplateElement, dest: HTMLElement, callback: FragmentCreator):void {
    if (template === null) {
      throw new Error(`Could not find template! conf ${JSON.stringify(this.conf)}`);
    }

    if (dest === null) {
      throw new Error(`Could not find dest! conf ${JSON.stringify(this.conf)}`);
    }

    const fragments = callback(template);
    dest.appendChild(fragments);
  }

  private createArticleFragment(template: HTMLTemplateElement, content: QiitaResponse.Article): DocumentFragment {
    const fragment: DocumentFragment = document.importNode(template.content, true);
    Object.entries(content).forEach((kv: any): void => {
      return this.fillTemplate(fragment, kv);
    });
    return fragment;
  }

  private fillTemplate(fragment: DocumentFragment, kv: any): void {
    const key = kv[0];
    const val = kv[1];
    const selector: string = `.js-${key.replace(/_/g, '-')}`;
    const target: HTMLElement = <HTMLElement>fragment.querySelector(selector);

    // Do nothing if target or val is null
    if (target === null || val === null) return;

    this.fillContent(key, val, target);
  }

  private fillContent(key: string, content: string, template: HTMLElement): void;
  private fillContent(key: string, content: number, template: HTMLElement): void;
  private fillContent(key: string, content: any, template: HTMLElement): void {
    // Do nothing if content is unavailable.
    if (typeof content === 'undefined') return;
    const val = (typeof content === 'number') ? Util.numToString(content) : content;
    if (content === null) return;

    switch (key) {

    // values to set as href
    case 'url':
    case 'profile-image-url':
    case 'website_url':
      template.setAttribute('href', val);
      break;

    case 'tags':
      val.forEach((tag: QiitaResponse.Tag) => {
        const li = document.createElement('li');
        li.innerText = tag.name;
        template.appendChild(li);
      });
      break;

    default:
      template.textContent = val;
      break;
    }
  }

}
