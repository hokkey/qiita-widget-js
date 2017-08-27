import Type from 'class/util/type-util';
import Elem from 'class/util/element-util';

export default class ToggleableBtn {
  constructor($btns, Toggleable) {
    this.$btns = $btns;
    this.stateClass = 'is-opened';
    this.dataLabel = 'tgt';
    this.Toggleable = Toggleable;
    this.toggleables = [];
    this.onToggleCb = undefined;

    if (!Type.isNodeList(this.$btns)) {
      throw new Error('this.$btns must be a NodeList!');
    }
  }

  init() {
    Elem.eachNode(this.$btns, ($elem) => {
      this._createToggleableFor($elem);
      this._attachListenerFor($elem);
    });
  }

  setOnToggleCb(f) {
    if (!Type.isFunction(f)) {
      throw new Error('"f" is not a function!');
    }

    this.onToggleCb = f;
  }

  _createToggleableFor($elem) {
    const selector = this._getSelectorFrom($elem);

    // If target instance is already created, do nothing.
    if (typeof this.toggleables[selector] !== 'undefined') {
      return;
    }

    this.toggleables[selector] = this._newToggleable(selector);
  }

  _getSelectorFrom($elem) {
    const selector = $elem.dataset[this.dataLabel];
    if (selector === null) {
      throw new Error(`data.[this.dataLabel] is blank or missing!`);
    }
    return '.' + selector;
  }

  _newToggleable(selector) {
    return new this.Toggleable(document.querySelectorAll(selector), this.stateClass, false);
  }

  getToggleable(selector) {
    return this.toggleables[selector];
  }

  _attachListenerFor($elem) {
    $elem.addEventListener('click', (e) => {
      e.preventDefault();
      this._onClick($elem);
    });
  }

  _onClick($elem) {
    const selector = this._getSelectorFrom($elem);
    const toggleable = this.toggleables[selector];

    if (typeof toggleable === 'undefined') {
      throw new Error('An instance of Toggleable was not created!');
    }

    if (!toggleable instanceof this.Toggleable) {
      throw new Error('A target instance is not expected type!');
    }

    toggleable.toggle();

    if (Type.isFunction(this.onToggleCb)) this.onToggleCb();
  }
}
