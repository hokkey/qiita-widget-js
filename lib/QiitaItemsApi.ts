import { Api } from '@/Api'
import {
  QiitaItemsApiConf,
  QiitaItemsApiParam,
  QiitaItemsApiRequestConf,
  QiitaResponse,
} from '@/interface'

export class QiitaItemsApi {
  private readonly api: Api
  private readonly requestConf: QiitaItemsApiRequestConf

  static defaultConf: QiitaItemsApiConf = {
    userId: 'qiita',
    maxRequest: 5,
    perPage: 100,
    cacheAgeMin: 15,
  }

  static validateConf(conf: QiitaItemsApiConf): QiitaItemsApiConf {
    // Number range validation:

    // perPage must be upper than zero and lower than 100
    if (conf.perPage <= 0) {
      conf.perPage = 1
    }
    if (conf.perPage > 100) {
      conf.perPage = 100
    }

    // maxRequest must be upper than minus one
    if (conf.maxRequest < 0) {
      conf.maxRequest = 0
    }

    return conf
  }

  constructor(conf: QiitaItemsApiParam) {
    const actualConf = QiitaItemsApi.validateConf(
      Object.assign({}, QiitaItemsApi.defaultConf, conf),
    )

    this.requestConf = {
      maxRequest: actualConf.maxRequest,
      cacheAgeMin: actualConf.cacheAgeMin,
      url: `https://qiita.com/api/v2/users/${actualConf.userId}/items`,
      params: {
        per_page: actualConf.perPage,
        page: 0,
      },
    }

    this.api = new Api()
  }

  // 記事がなくなるか、最大試行回数に到達するまでリクエストを続ける
  async fetch(): Promise<QiitaResponse.Article[]> {
    let counter = 0
    let result: QiitaResponse.Article[] = []

    while (counter < this.requestConf.maxRequest) {
      counter++
      this.createNextRequest()

      const res = await this.fetchItems()
      const isContinue = this.isThereNextPage<QiitaResponse.Article>(res)
      result = result.concat(res)

      if (isContinue) {
        continue
      }

      break
    }

    return result
  }

  private fetchItems(): Promise<QiitaResponse.Article[]> {
    return this.api.fetch<QiitaResponse.Article[]>(this.requestConf)
  }

  private createNextRequest(): void {
    this.requestConf.params.page += 1
  }

  private isThereNextPage<T>(list: T[]): boolean {
    // a result length is 0: break loop
    if (list.length === 0) {
      return false
    }

    // a result length is lower than perPage: break loop
    if (list.length < this.requestConf.params.per_page) {
      return false
    }

    // a result length is equal or larger than perPage: continue loop
    return true
  }
}
