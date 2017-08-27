import $ from 'jquery';
import JqAccordion from 'class/jq/accordion';

export default class JqPulldown extends JqAccordion {
  constructor(elem, prefix = 'js-pulldown') {
    super(elem, prefix, false);
  }

  _clickHandler() {
    this.$btn.click((e) => {
      e.stopPropagation();
      e.preventDefault();
      this._onClick(e);
    });
  }

  open() {
    super.open();
    const that = this;

    $(window).on('click', function onClickOutside() {
      that.close();
      $(window).off('click', onClickOutside);
    });
  }
}
