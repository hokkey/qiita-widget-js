import { RequestConf } from './interface'
import * as lscache from 'lscache'

export class Api {
  constructor() {
    if (typeof fetch === 'undefined') {
      throw new Error('This browser does not have Fetch API.')
    }
  }

  async fetch<T>(conf: RequestConf): Promise<T> {
    const url = new URL(conf.url)

    Object.keys(conf.params).forEach((key: string) => {
      const entry = conf.params[key]

      if (typeof entry === 'string') {
        url.searchParams.append(key, entry)
      }

      if (typeof entry === 'number') {
        url.searchParams.append(key, `${entry}`)
      }
    })

    const cache = this.getCache<T>(url.toString())
    if (cache != null) {
      return Promise.resolve<T>(cache)
    }

    const res = await fetch(url.toString())
    if (res.status !== 200) {
      return Promise.reject(new Error(`${res.status}`))
    }

    const result = <T>await res.json()
    this.saveCache<T>(url.toString(), result, conf.cacheAgeMin)

    return result
  }

  private getCache<T>(key: string): T | null {
    return <T | null>lscache.get(key)
  }

  private saveCache<T>(key: string, data: T, expireMin: number): void {
    lscache.set(key, data, expireMin)
  }
}
