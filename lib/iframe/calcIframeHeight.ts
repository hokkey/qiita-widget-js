import {isType} from "../util";

export function setIframeHeight(iframe: HTMLIFrameElement, target: HTMLElement): void {
  const paramHeight = target.dataset['height'];

  if (!isType(paramHeight, 'string')) {
    return;
  }

  if (paramHeight === 'auto') {
    return;
  }

  iframe.height = target.dataset['height'];
}

export function watchIframeHeight(iframe: HTMLIFrameElement, target: HTMLElement, id: number): void {
  const paramHeight = target.dataset['height'];

  window.addEventListener('message', (e) => {
    if (paramHeight !== 'auto') {
      return;
    }

    if (e.data === null) {
      return;
    }

    if (e.data.id !== id) {
      return;
    }

    iframe.height = e.data.height + 'px';
  }, false);
}
