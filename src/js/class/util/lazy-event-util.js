import Type from 'class/util/type-util';

const DEFAULT_DELAY = 100;

export default class LazyEventUtil {

  static attachEventCb($elem, eventName, callback) {
    if ($elem !== window && !Type.isElem($elem)) {
      throw new Error('$elem must be a HTMLElement!');
    }

    if (!Type.isFunction(callback)) {
      throw new Error('callback must be a function!');
    }

    const cb = (e) => {
      callback(e);
    };

    $elem.addEventListener(eventName, cb);

    // Use this cb for removing event listener
    return cb;
  }

  static attachLazyEventCb($elem, eventName, callback, delay) {
    const cb = LazyEventUtil.createDelayedCb(callback, delay);
    return LazyEventUtil.attachEventCb($elem, eventName, cb);
  }

  static attachLazyScrollCb($elem, callback, delay) {
    let currentOffset = window.pageYOffset;

    return LazyEventUtil.attachLazyEventCb($elem, 'scroll', (e) => {
      const wsc = window.pageYOffset;

      const scrollDirection = (() => {
        if (wsc > currentOffset) {
          return { y: wsc, direction: 'up', distance: wsc - currentOffset };
        }
        if (wsc < currentOffset) {
          return { y: wsc, direction: 'down', distance: currentOffset - wsc };
        }
        return { y: wsc, direction: '', distance: 0 };
      })();

      currentOffset = wsc;
      callback(e, scrollDirection);

    }, delay);
  }

  static removeListener($elem, eventName, listener) {
    if ($elem !== window && !Type.isElem($elem)) {
      throw new Error('$elem must be a HTMLElement!');
    }

    if (!Type.isFunction(listener)) {
      throw new Error('listener must be a function!');
    }

    $elem.removeEventListener(eventName, listener);
  }

  static attachLazyResizeCb($elem, callback, delay) {
    return LazyEventUtil.attachLazyEventCb($elem, 'resize', callback, delay);
  }

  static attachLazyHorizontalResizeCb($elem, callback, delay) {
    let currentWidth = window.innerWidth;

    return LazyEventUtil.attachLazyEventCb($elem, 'resize', (e) => {
      if (window.innerWidth === currentWidth) return;

      currentWidth = innerWidth;
      callback(e);

    }, delay);
  }

  static attachLazyVerticalResizeCb($elem, callback, delay) {
    let currentHeight = window.innerHeight;

    return LazyEventUtil.attachLazyEventCb($elem, 'resize', (e) => {
      if (window.innerHeight === currentHeight) return;

      currentHeight = innerHeight;
      callback(e);

    }, delay);
  }

  static createDelayedCb(callback, delay = DEFAULT_DELAY, timer = undefined) {
    return (e) => {
      if (typeof timer !== 'undefined') {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        callback(e);
      }, delay);
    }
  }
}
