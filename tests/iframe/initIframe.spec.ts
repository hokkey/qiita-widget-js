import { initIframe } from '~iframe/initIframe'
import { setIframeHeight, watchIframeHeight } from '~iframe/calcIframeHeight'
import { insertIframe } from '~iframe/insertIframe'

let target = document.createElement('div')
let iframe = document.createElement('iframe')

jest.mock('~iframe/insertIframe', () => {
  return {
    __esModule: true,
    insertIframe: jest.fn(() => {
      return iframe
    }),
  }
})

const insertIframeMock = insertIframe as unknown as jest.MockedFunction<typeof insertIframe>

jest.mock('~iframe/calcIframeHeight', () => {
  return {
    __esModule: true,
    setIframeHeight: jest.fn(),
    watchIframeHeight: jest.fn(),
  }
})

const setIframeHeightMock = setIframeHeight as unknown as jest.MockedFunction<
  typeof setIframeHeight
>
const watchIframeHeightMock = watchIframeHeight as unknown as jest.MockedFunction<
  typeof watchIframeHeight
>

describe('initIframe()', () => {
  const id = 1

  beforeEach(() => {
    insertIframeMock.mockClear()
    setIframeHeightMock.mockClear()
    watchIframeHeightMock.mockClear()
    target = document.createElement('div')
    iframe = document.createElement('iframe')
  })

  it('should call insertIframe()', () => {
    initIframe(target, id)
    expect(insertIframe).toBeCalledTimes(1)
    expect(insertIframe).toBeCalledWith(target, id)
  })

  it('should do nothing when insertIframe() returns null', () => {
    insertIframeMock.mockReturnValueOnce(null)
    initIframe(target, id)
    expect(iframe.scrolling).toBe('')
    expect(setIframeHeight).not.toBeCalled()
    expect(watchIframeHeight).not.toBeCalled()
  })

  it('should set attributions of the iframe', () => {
    initIframe(target, id)
    expect(iframe.scrolling).toBe('auto')
    expect(iframe.frameBorder).toBe('0')
    expect(iframe.marginWidth).toBe('0')
    expect(iframe.marginHeight).toBe('0')
    expect(iframe.width).toBe('100%')
    expect(iframe.height).toBe('220')
    expect(iframe.classList.contains('qiita-widget-iframe')).toBe(true)
    expect(iframe.style.transition).toBe('height .35s ease')
  })

  it('should call setIframeHeight()', () => {
    initIframe(target, id)
    expect(setIframeHeight).toBeCalledTimes(1)
    expect(setIframeHeight).toBeCalledWith(iframe, target)
  })

  it('should call watchIframeHeight()', () => {
    initIframe(target, id)
    expect(watchIframeHeight).toBeCalledTimes(1)
    expect(watchIframeHeight).toBeCalledWith(iframe, target, id)
  })
})
