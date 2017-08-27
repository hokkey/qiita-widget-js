import Type from 'class/util/type-util';

export default class OffsetUtil {

  static get($elem) {
    if (!Type.isElem($elem)) {
      throw new Error('A param must be a HTMLElement!');
    }

    const rect = $elem.getBoundingClientRect();

    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  }

}
