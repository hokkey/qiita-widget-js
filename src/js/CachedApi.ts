import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import CachedResponse from './CachedResponse';

export interface CachedApiConf {
  id: string;
  endpoint: string;
  expirationDay: number;
  axiosRequestConfig: AxiosRequestConfig,
}

export class CachedApi {

  static async get<T>(
    conf: CachedApiConf,
    cr: CachedResponse<T> = new CachedResponse<T>(conf.id)
  ): Promise<CachedResponse<T>> {

    // Force fetch from the server
    if (conf.expirationDay === 0) return CachedApi.fetch<T>(conf, cr);

    // Try to use localStorage
    const isCacheAvailable: boolean = cr.getCache();
    if (!isCacheAvailable) return CachedApi.fetch<T>(conf, cr);

    const isCacheNotExpired: boolean = cr.validateDate(conf.expirationDay);
    if (!isCacheNotExpired) return CachedApi.fetch<T>(conf, cr);

    // Return cache
    return cr;
  }

  static async fetch<T>(
    conf: CachedApiConf,
    cr: CachedResponse<T> = new CachedResponse<T>(conf.id)
  ): Promise<CachedResponse<T>> {

    const result: AxiosResponse = await axios.get(conf.endpoint, conf.axiosRequestConfig);
    cr.data = result.data;
    cr.setTimestamp(new Date());
    cr.saveCache();

    return cr;
  }
}
