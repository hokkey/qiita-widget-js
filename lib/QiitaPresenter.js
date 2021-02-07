'use strict'
exports.__esModule = true
exports.QiitaPresenter = void 0
var Util = require('./util')
var QiitaPresenter = /** @class */ (function () {
  function QiitaPresenter(dest, items, conf) {
    this.dest = dest
    this.items = items
    this.conf = Object.assign({}, QiitaPresenter.defaultConf, conf)
    var userTemplate = document.querySelector(this.conf.userTemplate)
    var articleTemplate = document.querySelector(this.conf.articleTemplate)
    this.userTemplate = userTemplate instanceof HTMLTemplateElement ? userTemplate : null
    this.articleTemplate = articleTemplate instanceof HTMLTemplateElement ? articleTemplate : null
    var userDest =
      dest === null
        ? document.querySelector(this.conf.userDest)
        : dest.querySelector(this.conf.userDest)
    var articleDest =
      dest === null
        ? document.querySelector(this.conf.articleDest)
        : dest.querySelector(this.conf.articleDest)
    this.userDest = userDest instanceof HTMLElement ? userDest : null
    this.articleDest = articleDest instanceof HTMLElement ? articleDest : null
  }
  QiitaPresenter.prototype.render = function () {
    this.claimNoTransition()
    this.renderUser()
    this.renderArticles()
    this.setSubject()
    this.claimLoaded()
  }
  QiitaPresenter.prototype.setSubject = function () {
    var _this = this
    if (this.dest === null) return
    var nodes = this.dest.querySelectorAll('.js-subject')
    Array.from(nodes, function (elem) {
      elem.innerText = _this.conf.subject
    })
  }
  QiitaPresenter.prototype.renderUser = function () {
    var _this = this
    if (this.userTemplate === null || this.userDest === null) return
    var callback = function (template) {
      var fragment = document.importNode(template.content, true)
      Object.entries(_this.items.getUserToShow()).forEach(function (kv) {
        _this.fillTemplate(fragment, kv)
      })
      return fragment
    }
    this.renderView(this.userTemplate, this.userDest, callback)
  }
  QiitaPresenter.prototype.renderArticles = function () {
    var _this = this
    if (this.articleTemplate === null || this.articleDest === null) return
    var callback = function (template) {
      var fragment = document.createDocumentFragment()
      _this.items.getArticlesToShow().forEach(function (item) {
        fragment.appendChild(_this.createArticleFragment(template, item))
      })
      return fragment
    }
    this.renderView(this.articleTemplate, this.articleDest, callback)
  }
  QiitaPresenter.prototype.createArticleFragment = function (template, content) {
    var _this = this
    var fragment = document.importNode(template.content, true)
    Object.entries(content).forEach(function (kv) {
      return _this.fillTemplate(fragment, kv)
    })
    return fragment
  }
  QiitaPresenter.prototype.renderView = function (template, dest, callback) {
    var fragments = callback(template)
    dest.appendChild(fragments)
  }
  QiitaPresenter.prototype.fillTemplate = function (fragment, kv) {
    var key = kv[0]
    var val = kv[1]
    var selector = '.js-' + key.replace(/_/g, '-')
    var target = fragment.querySelector(selector)
    // Do nothing if target is null
    if (target === null) return
    this.fillContent(key, val, target)
  }
  QiitaPresenter.prototype.fillContent = function (key, content, template) {
    if (Array.isArray(content)) {
      this.fillTags(content, template)
      return
    }
    var val = (function () {
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
      default:
        template.textContent = val
    }
  }
  QiitaPresenter.prototype.fillTags = function (tags, template) {
    tags.forEach(function (tag) {
      var li = document.createElement('li')
      li.innerText = tag.name
      template.appendChild(li)
    })
  }
  QiitaPresenter.prototype.claimNoTransition = function () {
    if (this.dest === null) return
    if (this.conf.useTransition) return
    this.dest.classList.add('is-no-transition')
  }
  QiitaPresenter.prototype.claimLoaded = function () {
    if (this.dest === null) return
    if (!this.conf.useTransition) return
    this.dest.classList.add('is-qiita-widget-loaded')
  }
  QiitaPresenter.defaultConf = {
    subject: '人気の投稿',
    userDest: '.js-qiita-user',
    userTemplate: '#qiita-user-tpl',
    articleDest: '.js-qiita-article',
    articleTemplate: '#qiita-article-tpl',
    useTransition: true,
  }
  return QiitaPresenter
})()
exports.QiitaPresenter = QiitaPresenter
