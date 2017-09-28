import {QiitaItemsConf, QiitaItemsParam, QiitaResponse} from "../Interface";
import * as Util from "../Util";
import {QiitaItemsApi} from "./QiitaItemsApi";


export class QiitaItems {

  private conf: QiitaItemsConf;
  private api: QiitaItemsApi;
  private articles: QiitaResponse.Article[];


  static defaultConf: QiitaItemsConf = {
    maxToShow: 5,
    useShuffle: false,
    sortByLike: true
  };


  constructor(conf: QiitaItemsParam) {
    this.conf = Object.assign({}, QiitaItems.defaultConf, conf);
    this.api = new QiitaItemsApi(this.conf);
  }

  async fetch(): Promise<void> {
    this.articles = await this.api.fetch();
  }


  private createOrder(): number[] {

    // Shuffle article orders
    const order = this.conf.useShuffle
      ? Util.shuffleArray<number>(Util.initSerialNumArray(this.articles.length))
      : Util.initSerialNumArray(this.articles.length)
      ;

    // Slice article orders
    return order.slice(0, this.conf.maxToShow);
  }


  getArticlesToShow() {
    const order = this.createOrder();

    // Sort the list if not it using shuffle
    const articlesOrigin = (this.conf.sortByLike && !this.conf.useShuffle)
      ? Util.sortArray(this.articles, 'likes_count')
      : this.articles
      ;

    // Create a list of required articles
    const articles = order.map((val) => {
      return articlesOrigin[val];
    });

    // Sort the list if it using shuffle
    return (this.conf.sortByLike && this.conf.useShuffle)
      ? Util.sortArray(articles, 'likes_count')
      : articles
      ;
  }


  getUserToShow(): QiitaResponse.User {
    const user = Object.assign({}, this.articles[0].user);
    user.likes_count = this.countAllLikes();
    user.url = `https://qiita.com/${user.id}`;
    return user;
  }


  private countAllLikes(): number {
    return this.articles.reduce((prev: number, item: QiitaResponse.Article): number => {
      return prev + item.likes_count;
    }, 0);
  }


}
