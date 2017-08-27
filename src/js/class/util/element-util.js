import Type from 'class/util/type-util';

/**
 * @class ElementUtil
 *
 * An element manipulation utility like jQuery
 */
export default class ElementUtil {

  static eachNode(nodeList, cb) {
    if (!Type.isNodeList(nodeList)) {
      throw new Error('Passed object must be a nodeList instance!');
    }

    Array.prototype.forEach.call(nodeList, (node, i) => {
      cb(node, i);
    });
    return nodeList;
  }

  static addEventForEach(nodeList, cb, eventName) {
    return ElementUtil.eachNode(nodeList, (node) => {
      node.addEventListener(eventName, (e) => {
        cb(e);
      });
    });
  }

  static addClickForEach(nodeList, cb) {
    return ElementUtil.addEventForEach(nodeList, cb, 'click');
  }
}
