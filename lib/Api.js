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
exports.Api = void 0
const lscache = __importStar(require('lscache'))
class Api {
  constructor() {
    if (typeof fetch === 'undefined') {
      throw new Error('This browser does not have Fetch API.')
    }
  }
  async fetch(conf) {
    const url = new URL(conf.url)
    Object.keys(conf.params).forEach((key) => {
      const entry = conf.params[key]
      if (typeof entry === 'string') {
        url.searchParams.append(key, entry)
      }
      if (typeof entry === 'number') {
        url.searchParams.append(key, `${entry}`)
      }
    })
    const cache = this.getCache(url.toString())
    if (cache != null) {
      return Promise.resolve(cache)
    }
    const res = await fetch(url.toString())
    if (res.status !== 200) {
      return Promise.reject(new Error(`${res.status}`))
    }
    const result = await res.json()
    this.saveCache(url.toString(), result, conf.cacheAgeMin)
    return result
  }
  getCache(key) {
    return lscache.get(key)
  }
  saveCache(key, data, expireMin) {
    lscache.set(key, data, expireMin)
  }
}
exports.Api = Api
