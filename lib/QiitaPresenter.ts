import * as Util from './util';
import {FragmentCreator, QiitaPresenterConf, QiitaResponse, QiitaWidgetParam} from "./interface";
import {QiitaItems} from "./QiitaItems";

export class QiitaPresenter {

  items: QiitaItems;

  private conf: QiitaPresenterConf;
  private userTemplate: HTMLTemplateElement;
  private articleTemplate: HTMLTemplateElement;
  private userDest: HTMLElement;
  private articleDest: HTMLElement;


  static defaultConf: QiitaPresenterConf = {
    userDest: '.js-qiita-user',
    userTemplate: '#qiita-user-tpl',
    articleDest: '.js-qiita-article',
    articleTemplate: '#qiita-article-tpl',
  };


  constructor(items: QiitaItems, conf: QiitaWidgetParam, dest: HTMLElement = null) {
    this.items = items;
    this.conf = Object.assign({}, QiitaPresenter.defaultConf, conf);

    this.userTemplate = <HTMLTemplateElement>document.querySelector(this.conf.userTemplate);
    this.articleTemplate = <HTMLTemplateElement>document.querySelector(this.conf.articleTemplate);

    if (dest !== null) {
      this.userDest = <HTMLElement>dest.querySelector(this.conf.userDest);
      this.articleDest = <HTMLElement>dest.querySelector(this.conf.articleDest);
      return;
    }

    this.userDest = <HTMLElement>document.querySelector(this.conf.userDest);
    this.articleDest = <HTMLElement>document.querySelector(this.conf.articleDest);
  }


  renderUser(): void {

    const callback: FragmentCreator = (template) => {

      const fragment: DocumentFragment = document.importNode(template.content, true);
      Object.entries(this.items.getUserToShow()).forEach((kv: any[]) => {
        this.fillTemplate(fragment, kv);
      });
      return fragment;

    };

    this.renderView(this.userTemplate, this.userDest, callback);
  }


  renderArticles(): void {

    const callback: FragmentCreator = (template) => {

      const fragment = document.createDocumentFragment();
      this.items.getArticlesToShow().forEach((item: QiitaResponse.Article) => {
        fragment.appendChild(this.createArticleFragment(template, item));
      });

      return fragment;

    };

    this.renderView(this.articleTemplate, this.articleDest, callback);
  }


  private createArticleFragment(template: HTMLTemplateElement, content: QiitaResponse.Article): DocumentFragment {

    const fragment: DocumentFragment = document.importNode(template.content, true);
    Object.entries(content).forEach((kv: any): void => {
      return this.fillTemplate(fragment, kv);
    });

    return fragment;
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
    case 'website_url':
      template.setAttribute('href', val);
      break;

    // values to set as src
    case 'profile_image_url':
      template.setAttribute('src', val);
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
