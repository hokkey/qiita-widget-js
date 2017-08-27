const d = document;
const isIE = (window.navigator.userAgent.indexOf('MSIE ') > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./));
const fontFamilies = [
  // 'Pragati+Narrow:400,700'
];

if (isIE) {
  d.documentElement.className = 'is-js is-ie';

  // insert font links
  fontFamilies.map((fontName) => {
    return '//fonts.googleapis.com/css?family=' + fontName;
  })
    .forEach(function (url) {
      const link = d.createElement('link');
      link.href = url;
      link.rel = 'stylesheet';
      d.getElementsByTagName('head')[0].appendChild(link);
    });

  // babel polyfill only for IE
  (function () {
    let testObject = {};

    if (!(Object.setPrototypeOf || testObject.__proto__)) {
      let nativeGetPrototypeOf = Object.getPrototypeOf;

      Object.getPrototypeOf = function (object) {
        if (object.__proto__) {
          return object.__proto__;
        } else {
          return nativeGetPrototypeOf.call(Object, object);
        }
      }
    }
  })();
}

if (!isIE) {
  d.documentElement.className = 'is-js';

  window.WebFontConfig = {
    google: {
      families: fontFamilies
    }
  };

  const wf = d.createElement('script'),
    s = d.scripts[0];
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';
  s.parentNode.insertBefore(wf, s);
}
