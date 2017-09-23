import {AxiosRequestConfig} from "axios";

export interface CachedResponseStorageData<T> {
  id: string;
  data: T;
  timestamp: Date;
}

export interface FragmentCreator {
  (template: HTMLTemplateElement): DocumentFragment;
}

export interface CachedApiConf {
  id: string;
  endpoint: string;
  expirationDay: number;
  axiosRequestConfig: AxiosRequestConfig,
}

export interface QiitaWidgetParam extends QiitaPresenterParam {
  userId?: string;
  perPage?: number;
  expirationDay?: number;
  maxRequest?: number;
}

export interface QiitaWidgetConf extends QiitaWidgetParam {
  userId: string;
  perPage: number;
  expirationDay: number;
  maxRequest: number;
}

export interface QiitaPresenterParam {
  useShuffle?: boolean;
  sortByLike?: boolean;

  userTemplate?: string;
  userDest?: string;
  articleTemplate?: string;
  articleDest?: string;

  max?: number;
}

export interface QiitaPresenterConf {
  useShuffle: boolean;
  sortByLike: boolean;

  userTemplate: string;
  userDest: string;
  articleTemplate: string;
  articleDest: string;

  max: number;
}

export namespace QiitaResponse {

  export interface Article {
    body: string;
    coediting: boolean;
    comments_count: number;
    created_at: Date;
    group?: any;
    id: string;
    likes_count: number;
    private: boolean;
    reactions_count: number;
    rendered_body: string;
    tags: Tag[];
    title: string;
    updated_at: Date;
    url: string;
    user: User;
  }

  export interface Tag {
    name: string;
    versions: any[];
  }

  export interface User {
    description: string;
    facebook_id: string;
    followers_count: number;
    likes_count?: number;
    url?: string;
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

}
