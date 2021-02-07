import { iframe } from '~iframe/iframe'
import { initIframe } from '~iframe/initIframe'

jest.mock('~iframe/initIframe', () => {
  return {
    __esModule: true,
    initIframe: jest.fn(),
  }
})

describe('iframe', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    document.body.innerHTML = ``
  })

  it('should call initIframe() if the document have some specified selectors', () => {
    document.body.innerHTML = `
<div class="js-qiita-widget"></div>
<div class="js-qiita-widget"></div>
<div class="js-qiita-widget"></div>
`
    iframe()
    expect(initIframe).toBeCalledTimes(3)
  })

  it('should not call initIframe() if the document does not have any specified selectors', () => {
    iframe()
    expect(initIframe).toBeCalledTimes(0)
  })
})
