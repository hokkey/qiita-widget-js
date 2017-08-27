import Type from 'class/util/type-util';
import Elem from 'class/util/element-util';

export default class Toggleable {
  constructor($targets, stateClass, stateIsActived = false) {
    this.$targets = $targets;
    this.stateClass = stateClass;
    this.default = stateIsActived;

    if (!Type.isNodeList(this.$targets)) {
      throw new Error('this.$targets must be HTMLElement or NodeList');
    }

    if (this.$targets.length === 0) {
      // do nothing
      return;
    }

    if (!Type.isString(this.stateClass) && !Type.isArray(this.stateClass)) {
      throw new Error('stateClass must be a string!');
    }

    if (!Type.isBool(this.default)) {
      throw new Error('stateIsActived must be a boolean!');
    }

    if (this.default) {
      this.add();
    }
  }

  _manipulateClass(method, stateClass, $elem) {
    if (!Type.isFunction($elem.classList[method])) {
      throw new Error('missing method name!')
    }

    if (!Type.isString(stateClass)) {
      throw new Error('stateClass must be a string!')
    }

    const list = stateClass.split(' ');

    list.forEach((c) => {
      $elem.classList[method](c);
    });
  }

  toggle(stateClass = this.stateClass) {
    Elem.eachNode(this.$targets, ($elem) => {
      this._manipulateClass('toggle', stateClass, $elem);
    });
  }

  add(stateClass = this.stateClass) {
    Elem.eachNode(this.$targets, ($elem) => {
      this._manipulateClass('add', stateClass, $elem);
    });
  }

  remove(stateClass = this.stateClass) {
    Elem.eachNode(this.$targets, ($elem) => {
      this._manipulateClass('remove', stateClass, $elem);
    });
  }
}
