import Swipeable from 'class/toggleable';

export default class ToggleableDrawer extends Swipeable {
  constructor($targets, stateClass, stateIsActived = false) {
    super($targets, stateClass, stateIsActived);
    this.bodyScrollClass = 'is-scroll-locked';
    this.scrollTopCache = null;
    this.$body = document.body;
  }

  toggle(stateClass) {
    super.toggle(stateClass);
    this._toggleBodyScrollClass();
  }

  add(stateClass) {
    super.add(stateClass);
    this._addBodyClass();
  }

  remove(stateClass) {
    super.remove(stateClass);
    this._removeBodyClass();
  }

  _toggleBodyScrollClass() {
    const isOpened = this.$body.classList.contains(this.bodyScrollClass);

    // close -> open
    if (!isOpened) {
      this._addBodyClass();
      return;
    }

    // open -> close
    this._removeBodyClass();
  }

  _addBodyClass() {
    this.scrollTopCache = this.$body.scrollTop;

    // dirty!
    setTimeout(() => {
      this.$body.classList.add(this.bodyScrollClass);
    }, 400);
  }

  _removeBodyClass() {
    this.$body.classList.remove(this.bodyScrollClass);
    window.scrollTo(0, this.scrollTopCache);
  }
}
