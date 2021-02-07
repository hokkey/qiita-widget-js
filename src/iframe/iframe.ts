import { initIframe } from '~iframe/initIframe'

export function iframe(): void {
  const destinations = document.querySelectorAll<HTMLElement>('.js-qiita-widget')

  // Do nothing
  if (destinations.length === 0) {
    return
  }

  Array.from(destinations, (target, index) => {
    initIframe(target, index)
  })
}

export default iframe()
