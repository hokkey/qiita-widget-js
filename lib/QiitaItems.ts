import { QiitaItemsConf, QiitaItemsParam, QiitaResponse } from './interface'
import * as Util from './util'
import { QiitaItemsApi } from './QiitaItemsApi'

export class QiitaItems {
  private api: QiitaItemsApi
  private articles: QiitaResponse.Article[]
  private readonly conf: QiitaItemsConf

  static defaultConf: QiitaItemsConf = {
    maxToShow: 5,
    useShuffle: false,
    sortByLike: true,
    filterByLikesFrom: 0,
  }

  static validateConf(conf: QiitaItemsConf): QiitaItemsConf {
    // A minus value is not expected
    if (conf.maxToShow < 0) {
      conf.maxToShow = 0
    }

    // A minus value is not expected
    if (conf.filterByLikesFrom < 0) {
      conf.filterByLikesFrom = 0
    }

    return conf
  }

  constructor(conf: QiitaItemsParam) {
    this.conf = QiitaItems.validateConf(Object.assign({}, QiitaItems.defaultConf, conf))
    this.api = new QiitaItemsApi(this.conf)
    this.articles = []
  }

  async fetch(): Promise<void> {
    this.articles = await this.api.fetch()
  }

  private createOrder<T>(source: T[]): number[] {
    // Shuffle articles order
    const order = this.conf.useShuffle
      ? Util.shuffleArray<number>(Util.initSerialNumArray(source.length))
      : Util.initSerialNumArray(source.length)

    // Slice articles order
    return order.slice(0, this.conf.maxToShow)
  }

  private filterOrigin(): QiitaResponse.Article[] {
    if (this.conf.filterByLikesFrom === 0) {
      return this.articles
    }

    return this.articles.filter((article) => {
      return article.likes_count >= this.conf.filterByLikesFrom
    })
  }

  getArticlesToShow(): QiitaResponse.Article[] {
    const filteredOrigin = this.filterOrigin()

    // Sort the list if not it using shuffle
    const articlesOrigin =
      this.conf.sortByLike && !this.conf.useShuffle
        ? Util.sortArray(filteredOrigin, 'likes_count')
        : filteredOrigin

    // Create articles order
    const order = this.createOrder<QiitaResponse.Article>(filteredOrigin)

    // Create a list of required articles
    const articles = order.map((val) => {
      return articlesOrigin[val]
    })

    // Sort the list if it using shuffle
    return this.conf.sortByLike && this.conf.useShuffle
      ? Util.sortArray(articles, 'likes_count')
      : articles
  }

  getUserToShow(): QiitaResponse.User {
    const user = this.articles[0].user
    return {
      ...user,
      likes_count: this.countAllLikes(),
      url: `https://qiita.com/${user.id}`,
    }
  }

  private countAllLikes(): number {
    return this.articles.reduce((prev: number, item: QiitaResponse.Article): number => {
      return prev + item.likes_count
    }, 0)
  }
}
