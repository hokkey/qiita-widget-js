import { QiitaItemsConf, QiitaItemsParam, QiitaResponse } from '@/interface'
export declare class QiitaItems {
  private readonly api
  private readonly conf
  private articles
  static readonly defaultConf: QiitaItemsConf
  static validateConf(conf: QiitaItemsConf): QiitaItemsConf
  constructor(conf: QiitaItemsParam)
  fetch(): Promise<void>
  private createOrder
  private filterOrigin
  getArticlesToShow(): QiitaResponse.Article[]
  getUserToShow(): QiitaResponse.User
  private countAllLikes
}
