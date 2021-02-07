'use strict'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
exports.__esModule = true
exports.QiitaItems = void 0
var Util = require('./util')
var QiitaItemsApi_1 = require('./QiitaItemsApi')
var QiitaItems = /** @class */ (function () {
  function QiitaItems(conf) {
    this.conf = QiitaItems.validateConf(Object.assign({}, QiitaItems.defaultConf, conf))
    this.api = new QiitaItemsApi_1.QiitaItemsApi(this.conf)
    this.articles = []
  }
  QiitaItems.validateConf = function (conf) {
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
  QiitaItems.prototype.fetch = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this
            return [4 /*yield*/, this.api.fetch()]
          case 1:
            _a.articles = _b.sent()
            return [2 /*return*/]
        }
      })
    })
  }
  QiitaItems.prototype.createOrder = function (source) {
    // Shuffle articles order
    var order = this.conf.useShuffle
      ? Util.shuffleArray(Util.initSerialNumArray(source.length))
      : Util.initSerialNumArray(source.length)
    // Slice articles order
    return order.slice(0, this.conf.maxToShow)
  }
  QiitaItems.prototype.filterOrigin = function () {
    var _this = this
    if (this.conf.filterByLikesFrom === 0) {
      return this.articles
    }
    return this.articles.filter(function (article) {
      return article.likes_count >= _this.conf.filterByLikesFrom
    })
  }
  QiitaItems.prototype.getArticlesToShow = function () {
    var filteredOrigin = this.filterOrigin()
    // Sort the list if not it using shuffle
    var articlesOrigin =
      this.conf.sortByLike && !this.conf.useShuffle
        ? Util.sortArray(filteredOrigin, 'likes_count')
        : filteredOrigin
    // Create articles order
    var order = this.createOrder(filteredOrigin)
    // Create a list of required articles
    var articles = order.map(function (val) {
      return articlesOrigin[val]
    })
    // Sort the list if it using shuffle
    return this.conf.sortByLike && this.conf.useShuffle
      ? Util.sortArray(articles, 'likes_count')
      : articles
  }
  QiitaItems.prototype.getUserToShow = function () {
    var user = this.articles[0].user
    return __assign(__assign({}, user), {
      likes_count: this.countAllLikes(),
      url: 'https://qiita.com/' + user.id,
    })
  }
  QiitaItems.prototype.countAllLikes = function () {
    return this.articles.reduce(function (prev, item) {
      return prev + item.likes_count
    }, 0)
  }
  QiitaItems.defaultConf = {
    maxToShow: 5,
    useShuffle: false,
    sortByLike: true,
    filterByLikesFrom: 0,
  }
  return QiitaItems
})()
exports.QiitaItems = QiitaItems
