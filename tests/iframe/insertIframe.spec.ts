import { insertIframe } from '~iframe/insertIframe'
import { makeIframeContent } from '~iframe/makeIframeContent'

jest.mock('~iframe/makeIframeContent', () => {
  return {
    __esModule: true,
    makeIframeContent: jest.fn().mockReturnValue('<p>ABC</p>'),
  }
})

const makeIframeContentMock = makeIframeContent as unknown as jest.MockedFunction<
  typeof makeIframeContent
>

describe('insertIframe()', () => {
  const id = 1
  document.body.innerHTML = `<div id="target"></div>`
  let target: HTMLElement = document.createElement('div')

  beforeEach(() => {
    makeIframeContentMock.mockClear()
    document.body.innerHTML = `<div id="target"></div>`
    const t = document.getElementById('target')
    if (t !== null) {
      target = t
    }
  })

  it('should insert a new iframe to the target', () => {
    insertIframe(target, id)
    expect(target.firstChild).toBeInstanceOf(HTMLIFrameElement)
  })

  it('should return null if the iframe.contentDocument is null', () => {
    target = document.createElement('div')
    expect(insertIframe(target, id)).toBeNull()
  })

  it('should call makeIframeContent()', () => {
    insertIframe(target, id)
    expect(makeIframeContent).toBeCalledTimes(1)
    expect(makeIframeContent).toBeCalledWith({}, id)
  })

  it('should return an iframe content inserted', () => {
    const iframe = insertIframe(target, id)
    if (iframe === null) return
    const doc = iframe.contentDocument
    if (doc === null) return
    expect(doc.body.classList.contains('is-iframe-loading')).toBe(true)
    expect(doc.body.innerHTML).toBe('<p>ABC</p>')
  })
})
