import { setupCache } from 'axios-cache-adapter';
import {CachedApiConf} from "../Interface";

export class CachedApi {

  static async fetch<T>(conf: CachedApiConf): Promise<T> {

    const api = setupCache({
      cache: {
        maxAge: conf.cacheAge,
        store: localStorage,
        clearOnStale: true
      }
    });

    return api(conf);
  }
}
