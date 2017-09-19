import axios, {AxiosRequestConfig} from 'axios';
import CachedResponse from './CachedResponse';

export interface CachedApiConf {
  id: string;
  endpoint: string;
  expiration: number;
  axiosRequestConfig: AxiosRequestConfig
}

export class CachedApi {
  static async get<T>(conf:CachedApiConf): Promise<CachedResponse<T>> {
    const responseCache: CachedResponse<T> = new CachedResponse<T>(conf.id);

    const isCacheAvailable: boolean = responseCache.getCache();
    console.log('Checking availability!');
    if (!isCacheAvailable) return CachedApi.fetch<T>(conf);

    const isCacheNotExpired: boolean = responseCache.validateDate(conf.expiration);
    console.log('Checking expires!');
    if (!isCacheNotExpired) return CachedApi.fetch<T>(conf);

    console.log('Cache used!');
    return responseCache;
  }

  static async fetch<T>(conf: CachedApiConf): Promise<CachedResponse<T>> {
    const cr: CachedResponse<T> = new CachedResponse<T>(conf.id);
    const result = await axios.get(conf.endpoint, conf.axiosRequestConfig);

    cr.data = result.data;
    cr.setTimestamp(new Date());
    cr.saveCache();

    return cr;
  }
}
