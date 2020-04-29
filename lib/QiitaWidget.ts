import {QiitaItems} from "./QiitaItems";
import {QiitaPresenter} from "./QiitaPresenter";
import {QiitaWidgetParam} from "./interface";

export default class QiitaWidget {

  private readonly presenter: QiitaPresenter;
  private readonly conf: QiitaWidgetParam;
  private readonly items: QiitaItems;

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
