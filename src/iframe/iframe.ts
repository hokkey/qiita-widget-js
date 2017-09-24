import {QiitaWidgetParam} from 'Interface';
import {toBoolean} from "../Util";
import {insertIframe} from "./insertIframe";
import {initIframe} from "./initIframe";

(() => {
  const destinations = document.querySelectorAll('.js-qiita-widget');

  // Do nothing
  if (destinations.length === 0) {
    return;
  }

  Array.from(destinations, (target:HTMLElement) => {
    initIframe(target);
  });

})();
