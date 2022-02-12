'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.QiitaItemsApi = void 0
const Api_1 = require('./Api')
class QiitaItemsApi {
  api
  requestConf
  static defaultConf = {
    userId: 'qiita',
    maxRequest: 5,
    perPage: 100,
    cacheAgeMin: 15,
  }
  static validateConf(conf) {
    if (conf.perPage <= 0) {
      conf.perPage = 1
    }
    if (conf.perPage > 100) {
      conf.perPage = 100
    }
    if (conf.maxRequest < 0) {
      conf.maxRequest = 0
    }
    return conf
  }
  constructor(conf) {
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
    this.api = new Api_1.Api()
  }
  async fetch() {
    let counter = 0
    let result = []
    while (counter < this.requestConf.maxRequest) {
      counter++
      this.createNextRequest()
      const res = await this.fetchItems()
      const isContinue = this.isThereNextPage(res)
      result = result.concat(res)
      if (isContinue) {
        continue
      }
      break
    }
    return result
  }
  fetchItems() {
    return this.api.fetch(this.requestConf)
  }
  createNextRequest() {
    this.requestConf.params.page += 1
  }
  isThereNextPage(list) {
    if (list.length === 0) {
      return false
    }
    if (list.length < this.requestConf.params.per_page) {
      return false
    }
    return true
  }
}
exports.QiitaItemsApi = QiitaItemsApi
