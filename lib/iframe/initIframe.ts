import { insertIframe } from '@/iframe/insertIframe'
import { setIframeHeight, watchIframeHeight } from '@/iframe/calcIframeHeight'

export function initIframe(target: HTMLElement, id: number): void {
  const iframe = insertIframe(target, id)

  if (iframe == null) {
    return
  }

  // Set iframe attributes
  iframe.scrolling = 'auto'
  iframe.frameBorder = '0'
  iframe.marginWidth = '0'
  iframe.marginHeight = '0'
  iframe.width = '100%'
  iframe.height = '220'
  iframe.classList.add('qiita-widget-iframe')
  iframe.style.transition = 'height .35s ease'

  setIframeHeight(iframe, target)
  watchIframeHeight(iframe, target, id)
}
