import {QiitaItems} from "./QiitaItems";
import {QiitaPresenter} from "./QiitaPresenter";
import {QiitaWidgetParam} from "../Interface";

export default class QiitaWidget {

  private conf: QiitaWidgetParam;
  private presenter: QiitaPresenter;
  private items: QiitaItems;


  static defaultConf: QiitaWidgetParam = {
  };


  constructor(conf: QiitaWidgetParam) {
    this.conf = Object.assign({}, QiitaWidget.defaultConf, conf);
    this.items = new QiitaItems(this.conf);
    this.presenter = new QiitaPresenter(this.items, this.conf);
  }

  async init():Promise<void> {
    await this.items.fetch();
    this.render();
  }


  private render():void {
    this.presenter.renderUser();
  }


}
