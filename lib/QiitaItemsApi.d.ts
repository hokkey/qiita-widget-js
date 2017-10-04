import {QiitaItemsApiConf, QiitaItemsApiParam, QiitaItemsApiRequestConf, QiitaResponse} from "./interface";
import {Api} from "./Api";
export declare class QiitaItemsApi {
  private conf: QiitaItemsApiConf;
  private requestConf: QiitaItemsApiRequestConf;
  private api: Api;
  static defaultConf: QiitaItemsApiConf;
  static validateConf(conf: QiitaItemsApiConf): QiitaItemsApiConf;
  constructor(conf: QiitaItemsApiParam);
  fetch(): Promise<QiitaResponse.Article[]>;
  private fetchItems();
  private createNextRequest();
  private isThereNextPage<T>(list);
}
