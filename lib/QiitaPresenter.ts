import * as Util from './util'
import { FragmentCreator, QiitaPresenterConf, QiitaResponse, QiitaWidgetParam } from './interface'
import { QiitaItems } from './QiitaItems'

export class QiitaPresenter {
  private readonly items: QiitaItems
  private readonly dest: HTMLElement | null
  private readonly conf: QiitaPresenterConf
  private readonly userTemplate: HTMLTemplateElement | null
  private readonly articleTemplate: HTMLTemplateElement | null
  private readonly userDest: HTMLElement | null
  private readonly articleDest: HTMLElement | null

  static defaultConf: QiitaPresenterConf = {
    subject: '人気の投稿',
    userDest: '.js-qiita-user',
    userTemplate: '#qiita-user-tpl',
    articleDest: '.js-qiita-article',
    articleTemplate: '#qiita-article-tpl',
    useTransition: true,
  }

  constructor(dest: HTMLElement | null, items: QiitaItems, conf: QiitaWidgetParam) {
    this.dest = dest
    this.items = items
    this.conf = Object.assign({}, QiitaPresenter.defaultConf, conf)

    const userTemplate = document.querySelector(this.conf.userTemplate)
    const articleTemplate = document.querySelector(this.conf.articleTemplate)

    this.userTemplate = userTemplate instanceof HTMLTemplateElement ? userTemplate : null
    this.articleTemplate = articleTemplate instanceof HTMLTemplateElement ? articleTemplate : null

    const userDest =
      dest === null
        ? document.querySelector(this.conf.userDest)
        : dest.querySelector(this.conf.userDest)

    const articleDest =
      dest === null
        ? document.querySelector(this.conf.articleDest)
        : dest.querySelector(this.conf.articleDest)

    this.userDest = userDest instanceof HTMLElement ? userDest : null
    this.articleDest = articleDest instanceof HTMLElement ? articleDest : null
  }

  render(): void {
    this.claimNoTransition()
    this.renderUser()
    this.renderArticles()
    this.setSubject()
    this.claimLoaded()
  }

  private setSubject(): void {
    if (this.dest === null) return

    const nodes = this.dest.querySelectorAll('.js-subject')
    Array.from(nodes, (elem) => {
      if (elem instanceof HTMLElement) {
        elem.innerText = this.conf.subject
      }
    })
  }

  private renderUser(): void {
    if (this.userTemplate === null || this.userDest === null) return

    const callback: FragmentCreator = (template) => {
      const fragment: DocumentFragment = document.importNode(template.content, true)

      Object.entries<unknown>(this.items.getUserToShow()).forEach((kv) => {
        this.fillTemplate(fragment, kv)
      })

      return fragment
    }

    this.renderView(this.userTemplate, this.userDest, callback)
  }

  private renderArticles(): void {
    if (this.articleTemplate === null || this.articleDest === null) return

    const callback: FragmentCreator = (template) => {
      const fragment = document.createDocumentFragment()

      this.items.getArticlesToShow().forEach((item: QiitaResponse.Article) => {
        fragment.appendChild(this.createArticleFragment(template, item))
      })

      return fragment
    }

    this.renderView(this.articleTemplate, this.articleDest, callback)
  }

  private createArticleFragment(
    template: HTMLTemplateElement,
    content: QiitaResponse.Article,
  ): DocumentFragment {
    const fragment: DocumentFragment = document.importNode(template.content, true)

    Object.entries(content).forEach((kv: [string, unknown]): void => {
      return this.fillTemplate(fragment, kv)
    })

    return fragment
  }

  private renderView(
    template: HTMLTemplateElement,
    dest: HTMLElement,
    callback: FragmentCreator,
  ): void {
    const fragments = callback(template)
    dest.appendChild(fragments)
  }

  private fillTemplate(fragment: DocumentFragment, kv: [string, unknown]): void {
    const key = kv[0]
    const val = kv[1]
    const selector = `.js-${key.replace(/_/g, '-')}`
    const target = fragment.querySelector(selector)

    // Do nothing if target or val is null
    if (target === null || val === null) return

    this.fillContent(key, val, target as HTMLElement)
  }

  private fillContent(key: string, content: unknown, template: HTMLElement): void {
    // Do nothing if content is unavailable.
    if (content == null) return

    const val: string = (() => {
      if (typeof content === 'string') return content
      if (typeof content === 'number') return Util.numToString(content)
      return ''
    })()

    switch (key) {
      // values to set as href
      case 'url':
      case 'website_url':
        template.setAttribute('href', val)
        break

      // values to set as src
      case 'profile_image_url':
        template.setAttribute('src', val)
        break

      case 'tags':
        if (!Array.isArray(content)) return
        content.forEach((tag: QiitaResponse.Tag) => {
          const li = document.createElement('li')
          li.innerText = tag.name
          template.appendChild(li)
        })
        break

      default:
        template.textContent = val
        break
    }
  }

  private claimNoTransition(): void {
    if (this.dest === null) return
    if (this.conf.useTransition) return

    this.dest.classList.add('is-no-transition')
  }

  private claimLoaded(): void {
    if (this.dest === null) return
    if (!this.conf.useTransition) return

    this.dest.classList.add('is-qiita-widget-loaded')
  }
}
