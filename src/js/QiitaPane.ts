import * as QiitaResponse from "./QiitaResponse";

export default class QiitaPane {

  public articles: QiitaResponse.Article[];
  public user: QiitaResponse.User;
  private userViewSelector: string;
  private userViewTemplate: HTMLTemplateElement;
  private articleViewSelector: string;
  private articleViewTemplate: HTMLTemplateElement;

  constructor(userViewSelector: string, articleViewSelector: string) {
    this.articles = [];
    this.user = null;

    this.userViewSelector = userViewSelector;
    this.userViewTemplate = <HTMLTemplateElement>document.querySelector(this.userViewSelector);

    if (this.userViewTemplate === null) {
      throw new Error('Could not find userViewTemplate!');
    }

    this.articleViewSelector = articleViewSelector;
    this.articleViewTemplate = <HTMLTemplateElement>document.querySelector(this.articleViewSelector);

    if (this.articleViewTemplate === null) {
      throw new Error('Could not find articleViewTemplate!');
    }
  }

  countAllLikes(): number {
    return this.articles.reduce(
      (prev: number, item: QiitaResponse.Article): number => {
        return prev + item.likes_count;
      }, 0
    );
  }

  renderUser(): void {
    if (typeof this.user.likes_count === 'undefined') {
      if (this.user.likes_count !== null) {
        this.user.likes_count = this.countAllLikes();
      }
    }

    const fragments = document.createDocumentFragment();
    Object.entries(this.user).forEach((kv: any[]) => {
      this.fillTemplate(fragments, kv);
    });
  }

  renderArticles(): void {
    const fragments = document.createDocumentFragment();
    this.articles.forEach((item: QiitaResponse.Article) => {
      fragments.appendChild(this.createArticleFragment(this.articleViewTemplate, item));
    });
    document.body.appendChild(fragments);
  }

  private createArticleFragment(template: HTMLTemplateElement, content: QiitaResponse.Article): DocumentFragment {
    const fragment: DocumentFragment = document.importNode(template.content, true);
    Object.entries(content).some((kv: any[]): boolean => {
      return this.fillTemplate(fragment, kv);
    });
    return fragment;
  }

  private fillTemplate(fragment: DocumentFragment, kv: any[]): boolean {
    const key = kv[0];
    const val = kv[1];

    const selector: string = `.js-${key.replace(/_/g, '-')}`;
    const target: HTMLElement = <HTMLElement>fragment.querySelector(selector);

    if (typeof val === 'undefined') return true;
    if (target === null || val === null) return true;

    if (key === 'url') {
      target.setAttribute('href', val);
      return true;
    }

    if (key === 'tags') {
      val.forEach((item: QiitaResponse.Tag) => {
        const li = document.createElement(`li`);
        li.innerText = item.name;
        target.appendChild(li);
      });
      return true;
    }

    target.textContent = val;
    return true;
  }
}
