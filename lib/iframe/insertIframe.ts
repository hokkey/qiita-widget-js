import { makeIframeContent } from '@/iframe/makeIframeContent'
import { pickDataset } from '@/iframe/pickDataset'

export function insertIframe(target: HTMLElement, id: number): HTMLIFrameElement | null {
  const iframe = document.createElement('iframe')
  target.appendChild(iframe)

  const doc = iframe.contentDocument

  if (doc == null) {
    return null
  }

  const content: string = makeIframeContent(pickDataset(target), id)

  doc.open()
  doc.write(content)
  doc.body.classList.add('is-iframe-loading')
  doc.close()

  return iframe
}
