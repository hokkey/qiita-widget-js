import {RequestConf} from "./interface";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';
import * as lscache from 'lscache';

export class Api {

  private api: AxiosStatic;
  private cache: any;

  constructor() {
    this.api = axios;
    this.cache = lscache;
  }

  async fetch<T>(conf: RequestConf): Promise<T> {
    const key = this.createCacheKey(conf.axiosRequestConfig);
    const cache = this.getCache<T>(key);

    if (cache != null) {
      return Promise.resolve<T>(cache);
    }

    const res: AxiosResponse = await this.api.request(conf.axiosRequestConfig);
    if (res.status !== 200) {
      return Promise.reject();
    }

    this.saveCache<T>(key, res.data, conf.cacheAgeMin);

    return <T>res.data;
  }

  private getCache<T>(key: string): T | null {
    return <T | null>this.cache.get(key);
  }

  private saveCache<T>(key: string, data: T, expireMin: number): void {
    this.cache.set(key, data, expireMin);
  }

  private createCacheKey(conf: AxiosRequestConfig): string {
    return `${conf.url}?${this.createUriString(conf.params)}`;
  }

  private createUriString(obj: any): string {
    return Object.entries(obj).map(pair => pair.map(encodeURIComponent).join('=')).join('&');
  }

}
