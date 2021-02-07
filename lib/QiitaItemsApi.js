'use strict'
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
exports.QiitaItemsApi = void 0
var Api_1 = require('./Api')
var QiitaItemsApi = /** @class */ (function () {
  function QiitaItemsApi(conf) {
    var actualConf = QiitaItemsApi.validateConf(Object.assign({}, QiitaItemsApi.defaultConf, conf))
    this.requestConf = {
      maxRequest: actualConf.maxRequest,
      cacheAgeMin: actualConf.cacheAgeMin,
      url: 'https://qiita.com/api/v2/users/' + actualConf.userId + '/items',
      params: {
        per_page: actualConf.perPage,
        page: 0,
      },
    }
    this.api = new Api_1.Api()
  }
  QiitaItemsApi.validateConf = function (conf) {
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
  // 記事がなくなるか、最大試行回数に到達するまでリクエストを続ける
  QiitaItemsApi.prototype.fetch = function () {
    return __awaiter(this, void 0, void 0, function () {
      var counter, result, res, isContinue
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            counter = 0
            result = []
            _a.label = 1
          case 1:
            if (!(counter < this.requestConf.maxRequest)) return [3 /*break*/, 3]
            counter++
            this.createNextRequest()
            return [4 /*yield*/, this.fetchItems()]
          case 2:
            res = _a.sent()
            isContinue = this.isThereNextPage(res)
            result = result.concat(res)
            if (isContinue) {
              return [3 /*break*/, 1]
            }
            return [3 /*break*/, 3]
          case 3:
            return [2 /*return*/, result]
        }
      })
    })
  }
  QiitaItemsApi.prototype.fetchItems = function () {
    return this.api.fetch(this.requestConf)
  }
  QiitaItemsApi.prototype.createNextRequest = function () {
    this.requestConf.params.page += 1
  }
  QiitaItemsApi.prototype.isThereNextPage = function (list) {
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
  QiitaItemsApi.defaultConf = {
    userId: 'qiita',
    maxRequest: 5,
    perPage: 100,
    cacheAgeMin: 15,
  }
  return QiitaItemsApi
})()
exports.QiitaItemsApi = QiitaItemsApi
