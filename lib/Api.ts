import { QiitaResponse, RequestConf } from './interface';
import * as lscache from 'lscache';

export class Api {

  private cache: any;

  constructor() {
    this.cache = lscache;
  }

  async fetch<T>(conf: RequestConf): Promise<T> {
    const url = new URL(conf.url);
    Object.keys(conf.params).forEach((key: string) => {

      if (typeof conf.params[key] === 'string') {
        url.searchParams.append(key, conf.params[key]);
      }

      else {
        url.searchParams.append(key, conf.params[key].toString());
      }
    });

    const cache = this.getCache<T>(url.toString());
    console.log(cache);
    if (cache != null) {
      return Promise.resolve<T>(cache);
    }

    const res = await fetch(url.toString());
    if (res.status !== 200) {
      return Promise.reject();
    }

    const result = <T>await res.json();
    this.saveCache<T>(url.toString(), result, conf.cacheAgeMin);
    return result;
  }

  private getCache<T>(key: string): T | null {
    return <T | null>this.cache.get(key);
  }

  private saveCache<T>(key: string, data: T, expireMin: number): void {
    this.cache.set(key, data, expireMin);
  }

}
