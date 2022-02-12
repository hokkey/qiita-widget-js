'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k]
          },
        })
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.QiitaItems = void 0
const Util = __importStar(require('./util'))
const QiitaItemsApi_1 = require('./QiitaItemsApi')
class QiitaItems {
  api
  conf
  articles
  static defaultConf = {
    maxToShow: 5,
    useShuffle: false,
    sortByLike: true,
    filterByLikesFrom: 0,
  }
  static validateConf(conf) {
    if (conf.maxToShow < 0) {
      conf.maxToShow = 0
    }
    if (conf.filterByLikesFrom < 0) {
      conf.filterByLikesFrom = 0
    }
    return conf
  }
  constructor(conf) {
    this.conf = QiitaItems.validateConf(Object.assign({}, QiitaItems.defaultConf, conf))
    this.api = new QiitaItemsApi_1.QiitaItemsApi(this.conf)
    this.articles = []
  }
  async fetch() {
    this.articles = await this.api.fetch()
  }
  createOrder(source) {
    const order = this.conf.useShuffle
      ? Util.shuffleArray(Util.initSerialNumArray(source.length))
      : Util.initSerialNumArray(source.length)
    return order.slice(0, this.conf.maxToShow)
  }
  filterOrigin() {
    if (this.conf.filterByLikesFrom === 0) {
      return this.articles
    }
    return this.articles.filter((article) => {
      return article.likes_count >= this.conf.filterByLikesFrom
    })
  }
  getArticlesToShow() {
    const filteredOrigin = this.filterOrigin()
    const articlesOrigin =
      this.conf.sortByLike && !this.conf.useShuffle
        ? Util.sortArray(filteredOrigin, 'likes_count')
        : filteredOrigin
    const order = this.createOrder(filteredOrigin)
    const articles = order.map((val) => {
      return articlesOrigin[val]
    })
    return this.conf.sortByLike && this.conf.useShuffle
      ? Util.sortArray(articles, 'likes_count')
      : articles
  }
  getUserToShow() {
    const user = this.articles[0].user
    return {
      ...user,
      likes_count: this.countAllLikes(),
      url: `https://qiita.com/${user.id}`,
    }
  }
  countAllLikes() {
    return this.articles.reduce((prev, item) => {
      return prev + item.likes_count
    }, 0)
  }
}
exports.QiitaItems = QiitaItems
