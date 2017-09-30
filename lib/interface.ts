import {AxiosRequestConfig} from "axios";

export interface FragmentCreator {
  (template: HTMLTemplateElement): DocumentFragment;
}


export interface QiitaItemsParam {
  perPage?: number;
  cacheAge?: number;
  maxToShow?: number;
  useShuffle?: boolean;
  sortByLike?: boolean;
}


export interface QiitaItemsConf extends QiitaItemsApiParam {
  maxToShow: number;
  useShuffle: boolean;
  sortByLike: boolean;
}


export interface QiitaItemsApiParam {
  userId?: string;
  maxRequest?: number;
  perPage?: number;
  cacheAge?: number;
}


export interface QiitaItemsApiConf {
  userId: string;
  maxRequest: number;
  perPage: number;
  cacheAge: number;
}


export interface QiitaItemsApiRequestConf extends RequestConf {
  maxRequest: number;

  axiosRequestConfig: {
    method: string;
    url: string;

    params: {
      page: number;
      per_page: number;
    }
  }
}


export interface RequestConf {
  cacheAge: number;
  axiosRequestConfig: AxiosRequestConfig,
}


export interface QiitaWidgetParam extends QiitaPresenterParam {
  userId?: string;

  useTransition?: boolean;
  container?: string;

  // for QiitaItemsParam
  perPage?: number;
  cacheAge?: number;
  maxRequest?: number;
  maxToShow?: number;
  useShuffle?: boolean;
  sortByLike?: boolean;
}


export interface QiitaPresenterParam {
  [key: string]: string | number | boolean;
  userTemplate?: string;
  userDest?: string;
  articleTemplate?: string;
  articleDest?: string;
}


export interface QiitaPresenterConf {
  userTemplate: string;
  userDest: string;
  articleTemplate: string;
  articleDest: string;
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
