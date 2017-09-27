import {Api} from "./Api";
import {QiitaResponse, RequestConf} from "../Interface";

export class ItemsApi {

  public userId: string;
  public articles: QiitaResponse.Article[];
  public user: QiitaResponse.User;

  private conf: RequestConf;
  private maxRequest: number;

  constructor(userId: string, cacheAge: number, url: string, perPage: number, maxRequest: number = 10) {

    this.userId =  userId;
    this.articles = [];
    this.user = null;

    this.maxRequest = maxRequest;
    this.conf = {
      cacheAge: cacheAge,
      axiosRequestConfig: {
        params: {
          page: 0,
          url: `https://qiita.com/api/v2/users/${this.userId}`,
          per_page: perPage
        }
      }
    }
  }

  async fetch():Promise<void> {
    await this.fetchArticles();
    await this.fetchUser();
  }

  // 記事がなくなるか、最大試行回数に到達するまでリクエストを続ける
  private async fetchArticles(): Promise<QiitaResponse.Article[]> {
    let counter = 0;
    const result: QiitaResponse.Article[] = [];

    while (counter < this.maxRequest) {
      this.createNextRequest();

      const res = await this.fetchItems();
      result.push(res);

      if (this.isThereNextPage<QiitaResponse.Article>(res)) {
        counter++;
        continue;
      }
      break;
    }
    return;
  }

  private async fetchItems(): Promise<QiitaResponse.Article[]> {
    return await Api.fetch<QiitaResponse.Article[]>(this.conf);
  }

  private createNextRequest(): void {
    this.conf.axiosRequestConfig.params.page += 1;
  }

  private isThereNextPage<T>(list: T[]): boolean {

    // 記事数0：ループ終了
    if (list.length === 0) {
      return false;
    }

    // 記事数がperPage未満：ループ終了
    if (list.length < this.conf.axiosRequestConfig.params.per_page) {
      return false;
    }

    // 記事数がperPageと同値以上：ループ継続
    return true;
  }

  private async fetchUser(): Promise<void> {
    const res = await this.fetchItems();

    if (res.length === 0) {
      this.user = null;
      return;
    }

    this.user = Object.assign({}, res[0].user);
  }

}
