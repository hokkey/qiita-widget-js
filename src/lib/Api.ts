import {RequestConf} from "../Interface";
declare var axiosCacheAdapter: any;

export class Api {

  api: Function;

  constructor(conf: RequestConf) {
    this.api = axiosCacheAdapter.setup({
      cache: {
        maxAge: conf.cacheAge,
        clearOnStale: false,
        debug: true
      }
    });
  }

  async fetch<T>(conf: RequestConf): Promise<T> {
    const res = this.api(conf.axiosRequestConfig);
    return res.data;
  }
}
