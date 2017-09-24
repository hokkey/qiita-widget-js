import {isType} from "../Util";
import {insertIframe} from "./insertIframe";
import {calcIframeHeight} from "./calcIframeHeight";

export function initIframe(target: HTMLElement):void {
  // Hide target
  target.style.display = 'none';

  const iframe = insertIframe(target);

  // Set iframe attributes
  iframe.scrolling = 'auto';
  iframe.frameBorder = '0';
  iframe.marginWidth = '0';
  iframe.marginHeight = '0';
  iframe.width = '100%';
  iframe.classList.add('qiita-widget-iframe');
  iframe.height = 'auto';

  if (isType(target.dataset['height'], 'string')) {
    iframe.height = target.dataset['height'];
  }

  // Return if height is 'auto'
  if (iframe.height !== 'auto') {
    return;
  }

  calcIframeHeight(iframe);
}
