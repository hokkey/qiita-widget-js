export type IframeMessageEventData = {
  id: number
  height: number
}

export function setIframeHeight(iframe: HTMLIFrameElement, target: HTMLElement): void {
  const paramHeight = target.dataset['height']

  if (typeof paramHeight !== 'string') {
    return
  }

  if (paramHeight === 'auto') {
    return
  }

  iframe.height = paramHeight
}

export function watchIframeHeight(
  iframe: HTMLIFrameElement,
  target: HTMLElement,
  id: number,
): void {
  const paramHeight = target.dataset['height']

  window.addEventListener(
    'message',
    (e: MessageEvent<IframeMessageEventData>) => {
      if (paramHeight !== 'auto') {
        return
      }

      if (e.data.id !== id) {
        return
      }

      iframe.height = `${e.data.height}px`
    },
    false,
  )
}
