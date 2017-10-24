import {QiitaItems} from "./QiitaItems";
import {QiitaPresenter} from "./QiitaPresenter";
import {QiitaWidgetParam} from "./interface";

export default class QiitaWidget {

  private conf: QiitaWidgetParam;
  private presenter: QiitaPresenter;
  private items: QiitaItems;

  static defaultConf: QiitaWidgetParam = {
  };


  constructor(container: HTMLElement, conf: QiitaWidgetParam) {
    this.conf = Object.assign({}, QiitaWidget.defaultConf, conf);
    this.items = new QiitaItems(this.conf);
    this.presenter = new QiitaPresenter(container, this.items, this.conf);
  }


  async init():Promise<void> {
    await this.items.fetch();
    this.presenter.render();
  }

}
