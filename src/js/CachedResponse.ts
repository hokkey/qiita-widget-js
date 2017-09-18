import CachedResponseInterface from './CachedResponseInterface';

export default class CachedResponse implements CachedResponseInterface {
  res: any;
  timestamp: Date;

  constructor(public id: string) {
    this.res = null;
    this.timestamp = null;
  }

  public validateDate(expiration: number): boolean {
    if (this.timestamp === null || expiration === 0) return false;
    if (this.res === null) return false;

    const diff: number = +(this.timestamp) - +(new Date());
    return (diff / 86400000) <= expiration;
  }

  public getCache(): boolean {
    const cache: any = localStorage.getItem(this.id);
    if (cache === null) return false;

    const parsedCache = JSON.parse(cache);
    this.res = parsedCache.res;
    this.timestamp = (() => {
      if (parsedCache.timestamp === null) return null;
      return new Date(parsedCache.timestamp);
    })();
    return true;
  }

  public getResponse(): any {
    return this.res;
  }

  public saveCache(): boolean {
    if (this.res === null) return false;

    localStorage.setItem(this.id, JSON.stringify({
      res: this.res,
      timestamp: this.timestamp
    }));
    return true;
  }

  public setTimestamp(date: Date): void {
    this.timestamp = date;
  }
}
