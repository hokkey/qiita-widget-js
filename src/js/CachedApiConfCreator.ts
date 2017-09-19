import {CachedApiConf, QiitaWidgetConf} from "./Interface";

export class CachedApiConfCreator {

  private conf: CachedApiConf;

  constructor(endpoint: string, conf: QiitaWidgetConf) {
    this.conf = {
      id: `${endpoint}?page=0`,
      endpoint: endpoint,
      expirationDay: conf.expirationDay,
      axiosRequestConfig: {
        params: {
          page: 0,
          per_page: conf.perPage
        }
      }
    }
  }

  // Return conf of a request for the next page
  getNextConf(): CachedApiConf {
    this.conf = this.countUp(this.conf);
    return this.conf;
  }

  private countUp(conf: CachedApiConf): CachedApiConf {
    const page = conf.axiosRequestConfig.params.page;
    const nextPage = page + 1;

    return Object.assign({}, conf, {
      id: `${conf.endpoint}?page=${nextPage}`,
      axiosRequestConfig: {
        params: {
          page: nextPage
        }
      }
    });
  }
}
