import elem from 'class/util/element-util';

export default function emulateHoverOnTouch(
  touchHoverClass = 'is-touched',
  target = 'a[href], button, input, textarea'
){
  const elements = document.querySelectorAll(target);

  if (elements.length === 0) return;

  elem.eachNode(elements, (elem) => {

    const end = () => {
      elem.classList.remove(touchHoverClass);
      elem.removeEventListener('touchend', end);
    };

    elem.addEventListener('touchstart', () => {
      elem.classList.add(touchHoverClass);
      elem.addEventListener('touchend', end, false);
    }, false);
  });
}
