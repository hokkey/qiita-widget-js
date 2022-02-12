'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const QiitaItems_1 = require('./QiitaItems')
const QiitaPresenter_1 = require('./QiitaPresenter')
class QiitaWidget {
  presenter
  conf
  items
  static defaultConf = {}
  constructor(container, conf) {
    this.conf = Object.assign({}, QiitaWidget.defaultConf, conf)
    this.items = new QiitaItems_1.QiitaItems(this.conf)
    this.presenter = new QiitaPresenter_1.QiitaPresenter(container, this.items, this.conf)
  }
  async init() {
    await this.items.fetch()
    this.presenter.render()
  }
}
exports.default = QiitaWidget
