import {CachedApiConf} from "./CachedApi";

export class CachedApiConfCreator {

  private conf: CachedApiConf;

  constructor(endpoint: string, expiration: number, perPage: number = 0, page: number = 0) {
    this.conf = {
      id: `${endpoint}?page=0`,
      endpoint: endpoint,
      expiration: expiration,
      axiosRequestConfig: {
        params: {
          page: 0,
          per_page: perPage
        }
      }
    }
  }

  getNextConf(): CachedApiConf {
    this.conf = this.countUp(this.conf);
    return this.conf;
  }

  private countUp(conf: CachedApiConf): CachedApiConf {
    const page = conf.axiosRequestConfig.params.page;
    const nextPage = page + 1;

    return Object.assign({}, conf, {
      id: `${conf.endpoint}?page=${nextPage}}`,
      axiosRequestConfig: {
        params: {
          page: nextPage
        }
      }
    });
  }
}
