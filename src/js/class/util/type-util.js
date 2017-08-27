/**
 * @class TypeUtil
 *
 * A data-type utility class
 */
export default class TypeUtil {

  static isElem(elem) {
    return (elem instanceof HTMLElement === true);
  }

  static isNodeList(node) {
    return (node instanceof NodeList === true);
  }

  static type(obj) {
    return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
  }

  static isBool(obj) {
    return (TypeUtil.type(obj) === 'boolean');
  }

  static isNumber(obj) {
    return (TypeUtil.type(obj) === 'number');
  }

  static isString(obj) {
    return (TypeUtil.type(obj) === 'string');
  }

  static isArray(obj) {
    return (TypeUtil.type(obj) === 'array');
  }

  static isFunction(obj) {
    return (TypeUtil.type(obj) === 'function');
  }

  static isObject(obj) {
    return (TypeUtil.type(obj) === 'object');
  }
}
