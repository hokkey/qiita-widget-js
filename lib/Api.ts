import {RequestConf} from "./interface";
import * as LocalForage from "localforage";
import * as axiosCacheAdapter from 'axios-cache-adapter';

export class Api {

  api: Function;

  constructor(conf: RequestConf) {
    this.api = axiosCacheAdapter.setup({
      cache: {
        maxAge: conf.cacheAge,
        store: LocalForage,
        debug: false
      }
    });
  }

  async fetch<T>(conf: RequestConf): Promise<T> {
    const res = await this.api(conf.axiosRequestConfig);
    return res.data;
  }
}
