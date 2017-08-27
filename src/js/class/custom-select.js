import Type from 'class/util/type-util';

export default class CustomSelect {
  constructor($target, selectorPrefix = '.js-selector') {

    // finding required sub elements

    this.$customSelect = $target;
    if (!Type.isElem(this.$customSelect)) {
      throw new Error('$target must be a HTMLElement!');
    }

    this.selectorPrefix = selectorPrefix;
    this.selectElemName = '-select';
    this.labelElemName = '-label';

    this.$selectElem = this.$customSelect.querySelector(this.selectorPrefix + this.selectElemName);
    if (this.$selectElem === null) {
      throw new Error('Could not find a $selectElem!');
    }

    this.$labelElem = this.$customSelect.querySelector(this.selectorPrefix + this.labelElemName);
    if (this.$labelElem === null) {
      throw new Error('Could not find a $labelElem!');
    }
  }

  init() {
    this.lastSelectedVal = this.getCurrentVal();
    this.lastSelectedText = this.getCurrentText();

    this.$selectElem.addEventListener('change', () => {
      this._onChange();
    });
  }

  _onChange() {
    const currentVal = this.getCurrentVal();
    const currentText = this.getCurrentText();

    if (this.lastSelectedVal === currentVal && this.lastSelectedText === currentText) {
      return;
    }

    try {
      this.$labelElem.textContent = this.getCurrentText();
      location.href = currentVal;
    }

    catch(e) {
      throw e;
    }
  }

  _getCurrentOption() {
    return this.$selectElem.options[this.$selectElem.selectedIndex];
  }

  /**
   * @method getCurrentVal
   * Return current selected option value
   *
   * @return {String}
   */
  getCurrentVal() {
    const v = this._getCurrentOption().value;
    if (v === null) {
      return '';
    }
    return v;
  }

  /**
   * @method getCurrentText
   * Return current selected option text
   *
   * @return {String}
   */
  getCurrentText() {
    return this._getCurrentOption().text;
  }
}
