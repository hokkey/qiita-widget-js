import Type from 'class/util/type-util';
import Lazy from 'class/util/lazy-event-util';
import Toggleable from 'class/toggleable';

const expandedClass = 'is-expanded';
const shrunkClass = 'is-shrunk';

export default class ToggleableOnScrolling extends Toggleable {
  constructor($elem) {
    super($elem, expandedClass, true);
    this.scrollDelay = 50;
  }

  watchScroll() {
    if (Type.isFunction(this.watcher)) {
      this.ignoreScroll();
    }
    this.watcher = this._createWatcher();
  }

  ignoreScroll() {
    if (!Type.isFunction(this.watcher)) {
      return;
    }
    Lazy.removeListener(window, 'scroll', this.watcher);
  }

  _createWatcher() {
    return Lazy.attachLazyScrollCb(window, (e, scrollInfo) => {
      this._onScroll(scrollInfo);
    }, this.scrollDelay);
  }

  _onScroll(info) {
    // if body element has 'is-scroll-locked', just ignore
    if (document.body.classList.contains('is-scroll-locked')) return;

    // if it bouncing, just ignore
    if (window.innerHeight + info.y >= document.body.clientHeight) return;

    // if scroll downed (going up), make header expanded
    if (info.direction === 'down' || info.y < 44) {
      this.add();
      return;
    }

    // if scroll upped (going down), make header shrunk
    if (info.direction === 'up') {
      this.remove();
    }
  }

  toggle() {
    super.toggle(`${shrunkClass} ${expandedClass}`);
  }

  add() {
    super.add();
    super.remove(shrunkClass);
  }

  remove() {
    super.remove();
    super.add(shrunkClass);
  }
}
