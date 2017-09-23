import {CachedApiConf, QiitaWidgetConf} from "./Interface";
import {isType} from "./Util";

export class CachedApiConfCreator {

  static validateConf(conf: CachedApiConf): void {
    if (!isType(conf.id, 'string')) {
      throw new TypeError('id must be a string!');
    }

    if (!isType(conf.endpoint, 'string')) {
      throw new TypeError('endpoint must be a string!');
    }

    if (!isType(conf.axiosRequestConfig.params.page, 'number')) {
      throw new TypeError('page param is not available!');
    }

    if (!isType(conf.axiosRequestConfig.params.per_page, 'number')) {
      throw new TypeError('per_page param is not available!');
    }
  }

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
    CachedApiConfCreator.validateConf(this.conf);
    return this.conf;
  }

  private countUp(conf: CachedApiConf): CachedApiConf {
    const page = conf.axiosRequestConfig.params.page;
    const nextPage = page + 1;

    return Object.assign({}, conf, {
      id: `${conf.endpoint}?page=${nextPage}`,
      axiosRequestConfig: {
        params: {
          page: nextPage,
          per_page: this.conf.axiosRequestConfig.params.per_page
        }
      }
    });
  }
}
