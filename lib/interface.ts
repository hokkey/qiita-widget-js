export interface FragmentCreator {
  (template: HTMLTemplateElement): DocumentFragment
}

export interface QiitaItemsParam {
  perPage?: number
  cacheAgeMin?: number
  maxToShow?: number
  useShuffle?: boolean
  sortByLike?: boolean
  filterByLikesFrom?: number
}

export interface QiitaItemsConf extends QiitaItemsApiParam {
  maxToShow: number
  useShuffle: boolean
  sortByLike: boolean
  filterByLikesFrom: number
}

export interface QiitaItemsApiParam {
  userId?: string
  maxRequest?: number
  perPage?: number
  cacheAgeMin?: number
}

export interface QiitaItemsApiConf {
  userId: string
  maxRequest: number
  perPage: number
  cacheAgeMin: number
}

export interface QiitaItemsApiRequestConf extends RequestConf {
  params: {
    per_page: number
    page: number
    [key: string]: string | number | boolean
  }
}

export interface RequestConf {
  maxRequest: number
  cacheAgeMin: number
  url: string
  params: {
    [key: string]: string | number | boolean
  }
}

export interface QiitaWidgetParam extends QiitaPresenterParam {
  userId?: string
  container?: string
  filterByLikesFrom?: number
  perPage?: number
  cacheAgeMin?: number
  maxRequest?: number
  maxToShow?: number
  useShuffle?: boolean
  sortByLike?: boolean
}

export interface QiitaPresenterParam {
  [key: string]: string | number | boolean | undefined
  useTransition?: boolean
  userTemplate?: string
  userDest?: string
  articleTemplate?: string
  articleDest?: string
  subject?: string
}

export interface QiitaPresenterConf {
  useTransition: boolean
  userTemplate: string
  userDest: string
  articleTemplate: string
  articleDest: string
  subject: string
}

type ArticleGroup = { [key: string]: string | number }

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace QiitaResponse {
  export interface Article {
    [key: string]: Article[keyof Article]
    body: string
    coediting: boolean
    comments_count: number
    created_at: string
    group?: ArticleGroup
    id: string
    likes_count: number
    private: boolean
    reactions_count: number
    rendered_body: string
    tags: Tag[]
    title: string
    updated_at: string
    url: string
    user: User
  }

  export interface Tag {
    name: string
    versions: string[]
  }

  export interface User {
    [key: string]: User[keyof User]
    description: string
    facebook_id: string
    followers_count: number
    likes_count?: number
    url?: string
    github_login_name: string
    id: string
    items_count: number
    linkedin_id: string
    location: string
    name: string
    organization: string
    permanent_id: number
    profile_image_url: string
    twitter_screen_name: string
    website_url: string
  }
}
