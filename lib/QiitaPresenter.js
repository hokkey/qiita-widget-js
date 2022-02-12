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
exports.QiitaPresenter = void 0
const Util = __importStar(require('./util'))
class QiitaPresenter {
  items
  dest
  conf
  userTemplate
  articleTemplate
  userDest
  articleDest
  static defaultConf = {
    subject: '人気の投稿',
    userDest: '.js-qiita-user',
    userTemplate: '#qiita-user-tpl',
    articleDest: '.js-qiita-article',
    articleTemplate: '#qiita-article-tpl',
    useTransition: true,
  }
  constructor(dest, items, conf) {
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
  render() {
    this.claimNoTransition()
    this.renderUser()
    this.renderArticles()
    this.setSubject()
    this.claimLoaded()
  }
  setSubject() {
    if (this.dest === null) return
    const nodes = this.dest.querySelectorAll('.js-subject')
    Array.from(nodes, (elem) => {
      elem.innerText = this.conf.subject
    })
  }
  renderUser() {
    if (this.userTemplate === null || this.userDest === null) return
    const callback = (template) => {
      const fragment = document.importNode(template.content, true)
      Object.entries(this.items.getUserToShow()).forEach((kv) => {
        this.fillTemplate(fragment, kv)
      })
      return fragment
    }
    this.renderView(this.userTemplate, this.userDest, callback)
  }
  renderArticles() {
    if (this.articleTemplate === null || this.articleDest === null) return
    const callback = (template) => {
      const fragment = document.createDocumentFragment()
      this.items.getArticlesToShow().forEach((item) => {
        fragment.appendChild(this.createArticleFragment(template, item))
      })
      return fragment
    }
    this.renderView(this.articleTemplate, this.articleDest, callback)
  }
  createArticleFragment(template, content) {
    const fragment = document.importNode(template.content, true)
    Object.entries(content).forEach((kv) => {
      return this.fillTemplate(fragment, kv)
    })
    return fragment
  }
  renderView(template, dest, callback) {
    const fragments = callback(template)
    dest.appendChild(fragments)
  }
  fillTemplate(fragment, kv) {
    const key = kv[0]
    const val = kv[1]
    const selector = `.js-${key.replace(/_/g, '-')}`
    const target = fragment.querySelector(selector)
    if (target === null) return
    this.fillContent(key, val, target)
  }
  fillContent(key, content, template) {
    if (Array.isArray(content)) {
      const tags = content
      this.fillTags(tags, template)
      return
    }
    const val = (() => {
      if (typeof content === 'string') return content
      if (typeof content === 'number') return Util.numToString(content)
      return ''
    })()
    switch (key) {
      case 'url':
      case 'website_url':
        template.setAttribute('href', val)
        break
      case 'profile_image_url':
        template.setAttribute('src', val)
        break
      default:
        template.textContent = val
    }
  }
  fillTags(tags, template) {
    tags.forEach((tag) => {
      const li = document.createElement('li')
      li.innerText = tag.name
      template.appendChild(li)
    })
  }
  claimNoTransition() {
    if (this.dest === null) return
    if (this.conf.useTransition) return
    this.dest.classList.add('is-no-transition')
  }
  claimLoaded() {
    if (this.dest === null) return
    if (!this.conf.useTransition) return
    this.dest.classList.add('is-qiita-widget-loaded')
  }
}
exports.QiitaPresenter = QiitaPresenter
