import {CachedResponseStorageData} from "./Interface";

export default class CachedResponse<T> implements CachedResponseStorageData<T> {
  id: string;
  data: T;
  timestamp: Date;

  constructor(id: string) {
    this.id = id;
    this.data = null;
    this.timestamp = null;
  }

  validateDate(expirationDay: number): boolean {
    if (this.timestamp === null || expirationDay === 0) {
      return false;
    }
    if (this.data === null) {
      return false;
    }

    const diff: number = +(this.timestamp) - +(new Date());

    if (Number.isNaN(diff)) {
      throw new Error('unexpected NaN value!');
    }

    return (diff / 86400000) <= expirationDay;
  }

  getCache(): boolean {
    const cache: string = localStorage.getItem(this.id);
    if (cache === null) return false;

    const parsedCache: CachedResponse<T> = JSON.parse(cache);
    this.data = parsedCache.data;
    this.timestamp = new Date(parsedCache.timestamp);
    return true;
  }

  saveCache(): boolean {
    if (this.data === null) return false;

    localStorage.setItem(this.id, JSON.stringify({
      data: this.data,
      timestamp: this.timestamp
    }));
    return true;
  }

  setTimestamp(date: Date): void {
    this.timestamp = date;
  }
}
