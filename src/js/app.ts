import axios from 'axios';

declare module QiitaResponse {

  export interface Tag {
    name: string;
    versions: any[];
  }

  export interface User {
    description: string;
    facebook_id: string;
    followees_count: number;
    followers_count: number;
    github_login_name: string;
    id: string;
    items_count: number;
    linkedin_id: string;
    location: string;
    name: string;
    organization: string;
    permanent_id: number;
    profile_image_url: string;
    twitter_screen_name: string;
    website_url: string;
  }

  export interface RootObject {
    rendered_body: string;
    body: string;
    coediting: boolean;
    comments_count: number;
    created_at: Date;
    group?: any;
    id: string;
    likes_count: number;
    private: boolean;
    reactions_count: number;
    tags: Tag[];
    title: string;
    updated_at: Date;
    url: string;
    user: User;
  }
}

interface CachedResponseInterface {
  id: string;
  response: any;
  timestamp?: Date;
  validateDate(expiration: number): boolean;
  getCache(): boolean;
  saveCache(): boolean;
  setTimestamp(date: Date): void;
}

class CachedResponse implements CachedResponseInterface {
  response: any;
  timestamp: Date;

  constructor(public id: string) {
    this.response = null;
    this.timestamp = null;
  }

  public validateDate(expiration: number): boolean {
    if (this.timestamp === null) return false;

    const now: Date = new Date();
    const diff: number = +(this.timestamp) - +(now);
    return (diff / 86400000) <= expiration;
  }

  public getCache(): boolean {
    const cache:any = localStorage.getItem(this.id);
    if (typeof cache === 'undefined') return false;
    this.response = JSON.parse(cache);
    return true;
  }

  public saveCache(): boolean {
    if (this.response === null) return false;
    localStorage.setItem(this.id, JSON.stringify(this));
    return true;
  }

  public setTimestamp(date: Date): void {
    this.timestamp = date;
  }
}

class CachedApi {
  static get(endpoint: string, expiration: number = 1): Promise<CachedResponse> {
    const responseCache: CachedResponse = new CachedResponse(endpoint);

    const isCacheAvailable: boolean = responseCache.getCache();
    if (!isCacheAvailable) return CachedApi.fetch(endpoint);

    const isCacheNotExpired: boolean = responseCache.validateDate(expiration);
    if (!isCacheNotExpired) return CachedApi.fetch(endpoint);

    return new Promise((resolve) => {
      resolve(responseCache);
    });
  }

  static fetch(endpoint: string, params: any) {
    return axios.get(endpoint, params)
      .then((response: any) => {
        const res: CachedResponse = new CachedResponse(response);
      })
    ;
  }

}
