export interface Article {
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

export interface Tag {
  name: string;
  versions: any[];
}

export interface User {
  description: string;
  facebook_id: string;
  followees_count: number;
  followers_count: number;
  likes_count?: number;
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
