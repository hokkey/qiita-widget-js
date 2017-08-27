import Type from 'class/util/type-util';
import $ from 'jquery';

export default class JqAccordion {
  constructor(elem, prefix = 'js-accordion', retainScrollOnClose = false) {
    this.$container = elem;

    if(Type.isElem(elem)) {
      this.$container = $(elem);
    }

    this.$btn = this.$container.find(`.${prefix}-btn`);
    if(this.$btn.length === 0) {
      throw new Error(`${prefix}-btn is not found!`);
    }

    this.$tgt = this.$container.find(`.${prefix}-tgt`);
    if(this.$tgt.length === 0) {
      throw new Error(`${prefix}-tgt is not found!`);
    }

    this.$inner = this.$container.find(`.${prefix}-inner`);
    if(this.$inner.length === 0) {
      throw new Error(`${prefix}-inner is not found!`);
    }

    this.openClass = 'is-opened';
    this.isOpened = false;

    this.innerHeight = this.$inner.height();
    this.retainScrollOnClose = retainScrollOnClose;

    this._init();
  }

  _init() {
    this._clickHandler();

    if (!this.$container.hasClass(this.openClass)) {
      this.close();
      return;
    }

    this.isOpened = true;
  }

  _onClick(e) {
    const currentTopPos = () => {
      if (this.retainScrollOnClose) {
        //save current top offset pos so that we can add it later when
        //updating the scrollTop
        return $(e.currentTarget)[0].getBoundingClientRect().top;
      }
      return 0;
    };

    this.toggle();

    if (!this.retainScrollOnClose || this.isOpened) {
      return;
    }

    $('html, body').scrollTop($(e.currentTarget).offset().top - currentTopPos);
  }

  _clickHandler() {
    this.$btn.click((e) => {
      e.preventDefault();
      this._onClick(e);
    });
  }

  toggle() {
    if (this.isOpened) {
      this.close();
      return;
    }

    this.open();
  }

  open() {
    this.$tgt.css({'max-height': this.innerHeight});
    this.isOpened = true;
    this.$container.addClass(this.openClass);
  }

  close() {
    this.$tgt.css({'max-height': 0});
    this.isOpened = false;
    this.$container.removeClass(this.openClass);
  }
}
