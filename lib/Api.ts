import {RequestConf} from "./interface";
import * as LocalForage from "localforage";
import * as AxiosCacheAdapter from 'axios-cache-adapter';
import {AxiosResponse} from "axios";
import {AxiosCacheAdapterSetupCallback} from "axios-cache-adapter";

export class Api {

  private api: AxiosCacheAdapterSetupCallback;

  constructor(conf: RequestConf) {
    this.api = AxiosCacheAdapter.setup({
      cache: {
        maxAge: conf.cacheAge,
        store: LocalForage,
        debug: false
      }
    });
  }

  async fetch<T>(conf: RequestConf): Promise<T> {
    const apiConf = conf.axiosRequestConfig;
    const res: AxiosResponse = await this.api(apiConf);
    return <T>res.data;
  }
}
