import {Api} from "./Api";
import {QiitaItemsApiConf, QiitaItemsApiParam, QiitaItemsApiRequestConf, QiitaResponse} from "../Interface";

export class QiitaItemsApi {

  private conf: QiitaItemsApiConf;
  private requestConf: QiitaItemsApiRequestConf;
  private api: Api;


  static defaultConf: QiitaItemsApiConf = {
    userId: 'qiita',
    maxRequest: 5,
    perPage: 100,
    cacheAge: 15 * 60 * 1000
  };


  static validateConf(conf: QiitaItemsApiConf): QiitaItemsApiConf {
    // Number range validation:

    // perPage must be upper than zero and lower than 100
    if (conf.perPage <= 0) {
      conf.perPage = 1;
    }
    if (conf.perPage > 100) {
      conf.perPage = 100;
    }

    // maxRequest must be upper than minus one
    if (conf.maxRequest < 0) {
      conf.maxRequest = 0;
    }

    return conf;
  }


  constructor(conf: QiitaItemsApiParam) {

    this.conf = QiitaItemsApi.validateConf(Object.assign({}, QiitaItemsApi.defaultConf, conf));
    this.requestConf = {
      maxRequest: this.conf.maxRequest,
      cacheAge: this.conf.cacheAge,

      axiosRequestConfig: {
        method: 'get',
        url: `https://qiita.com/api/v2/users/${this.conf.userId}/items`,

        params: {
          page: 0,
          per_page: this.conf.perPage
        }
      }
    };

    this.api = new Api(this.requestConf);
  }


  // 記事がなくなるか、最大試行回数に到達するまでリクエストを続ける
  async fetch(): Promise<QiitaResponse.Article[]> {
    let counter = 0;
    let result: QiitaResponse.Article[] = [];

    while (counter < this.conf.maxRequest) {
      counter++;
      this.createNextRequest();

      const res = await this.fetchItems();
      const isContinue = this.isThereNextPage<QiitaResponse.Article>(res);
      result = result.concat(res);

      if (isContinue) {
        continue;
      }

      break;
    }

    return result;
  }


  private async fetchItems(): Promise<QiitaResponse.Article[]> {
    return await this.api.fetch<QiitaResponse.Article[]>(this.requestConf);
  }


  private createNextRequest(): void {
    this.requestConf.axiosRequestConfig.params.page += 1;
  }


  private isThereNextPage<T>(list: T[]): boolean {

    // a result length is 0: break loop
    if (list.length === 0) {
      return false;
    }

    // a result length is lower than per_page: break loop
    if (list.length < this.requestConf.axiosRequestConfig.params.per_page) {
      return false;
    }

    // a result length is equal or larger than per_page: continue loop
    return true;
  }

}
