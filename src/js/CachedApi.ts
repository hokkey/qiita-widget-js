import axios from 'axios';
import CachedResponse from './CachedResponse';

export default class CachedApi {
  static async get(endpoint: string, expiration: number = 1): Promise<CachedResponse> {
    const responseCache: CachedResponse = new CachedResponse(endpoint);

    const isCacheAvailable: boolean = responseCache.getCache();
    if (!isCacheAvailable) return CachedApi.fetch(endpoint);

    const isCacheNotExpired: boolean = responseCache.validateDate(expiration);
    if (!isCacheNotExpired) return CachedApi.fetch(endpoint);

    return responseCache;
  }

  static async fetch(endpoint: string, params: any = {}): Promise<CachedResponse> {
    const cr: CachedResponse = new CachedResponse(endpoint);
    const result = await axios.get(endpoint, params);

    cr.res = result.data;
    cr.setTimestamp(new Date());
    cr.saveCache();

    return cr;
  }
}
