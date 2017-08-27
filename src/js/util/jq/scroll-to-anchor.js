const $root = $('html, body');

export default function jqScrollToAnchor(duration = 400, globalOffset) {
  $('a[href]').each((index, item) => {
    const $result = check(item);

    if ($result === false) {
      return true;
    }

    addClickListener(item, $result, duration, globalOffset);
    return true;
  });
}

function check(item) {
  const href = $(item).attr('href');

  // ignore #
  if (href === '#') {
    return false;
  }

  const indexOf = href.indexOf('#');

  if (indexOf !== 0) {
    return false;
  }
  return checkAnchor(href);
}

function checkAnchor(anchor) {
  const $target = (() => {
    if (anchor.indexOf('#') !== -1) {
      return $(document.getElementById(anchor.substr(1)));
    }
    return $(anchor);
  })();

  if (typeof $target.offset === 'undefined') {
    return false;
  }

  return $target;
}

function addClickListener(item, $target, duration, offset = 0) {
  $(item).on('click', (e) => {
    onClick(e, $target, duration, offset);
  });
}

function onClick(e, $target, duration, offset) {
  e.preventDefault();
  return scrollAnimate($target, duration, offset);
}

export function scrollTo(anchor, duration, offset = 0) {
  const $target = checkAnchor(anchor);
  if (typeof $target === 'undefined') {
    return false;
  }
  return scrollAnimate($target, duration, offset);
}

export function scrollRelativeTo(anchor, duration, times = 3.5) {
  const $target = checkAnchor(anchor);
  if (typeof $target === 'undefined') {
    return false;
  }
  const offset = $(window).height() / times * -1;
  return scrollAnimate($target, duration, offset);
}

export function scrollAnimate($target, duration, offset = 0) {
  console.log($target.offset().top + offset);
  $root.animate({scrollTop: $target.offset().top + offset}, duration);
  return false;
}
