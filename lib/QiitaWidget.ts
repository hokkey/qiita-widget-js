import {QiitaItems} from "./QiitaItems";
import {QiitaPresenter} from "./QiitaPresenter";
import {QiitaWidgetParam} from "./interface";

export default class QiitaWidget {

  private conf: QiitaWidgetParam;
  private presenter: QiitaPresenter;
  private items: QiitaItems;
  private dest: HTMLElement;

  static defaultConf: QiitaWidgetParam = {
    useTransition: true
  };


  constructor(container: HTMLElement, conf: QiitaWidgetParam) {
    this.conf = Object.assign({}, QiitaWidget.defaultConf, conf);
    this.dest = container;
    this.items = new QiitaItems(this.conf);
    this.presenter = new QiitaPresenter(this.items, this.conf, this.dest);

    if (!this.conf.useTransition) {
      this.dest.classList.add('is-no-transition');
    }
  }


  async init():Promise<void> {
    await this.items.fetch();
    this.render();
    this.claimLoaded();
  }


  private render(): void {
    this.presenter.renderUser();
    this.presenter.renderArticles();
  }


  private claimLoaded(): void {
    if (this.dest === null) return;
    if (!this.conf.useTransition) return;

    this.dest.classList.add('is-qiita-widget-loaded');
  }

}
