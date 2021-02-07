import { QiitaPresenterConf, QiitaWidgetParam } from './interface'
import { QiitaItems } from './QiitaItems'
export declare class QiitaPresenter {
  private readonly items
  private readonly dest
  private readonly conf
  private readonly userTemplate
  private readonly articleTemplate
  private readonly userDest
  private readonly articleDest
  static readonly defaultConf: QiitaPresenterConf
  constructor(dest: HTMLElement | null, items: QiitaItems, conf: QiitaWidgetParam)
  render(): void
  private setSubject
  private renderUser
  private renderArticles
  private createArticleFragment
  private renderView
  private fillTemplate
  private fillContent
  private fillTags
  private claimNoTransition
  private claimLoaded
}
