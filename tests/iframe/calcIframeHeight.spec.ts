import {
  setIframeHeight,
  watchIframeHeight,
  IframeMessageEventData,
} from '~iframe/calcIframeHeight'

describe('setIframeHeight()', () => {
  let target = document.createElement('div')
  let iframe = document.createElement('iframe')

  beforeEach(() => {
    target = document.createElement('div')
    iframe = document.createElement('iframe')
  })

  it('should attach height from the target to the iframe', () => {
    target.dataset['height'] = '500px'
    setIframeHeight(iframe, target)
    expect(iframe.height).toBe('500px')
  })

  it('should do nothing if the target has a value "auto" at the data-height', () => {
    target.dataset['height'] = 'auto'
    setIframeHeight(iframe, target)
    expect(iframe.height).toBe('')
  })

  it('should do nothing if the target does not have "data-height"', () => {
    setIframeHeight(iframe, target)
    expect(iframe.height).toBe('')
  })
})

describe('watchIframeHeight()', () => {
  let target = document.createElement('div')
  let iframe = document.createElement('iframe')
  const id = 1
  const addEventListenerSpy = jest.spyOn<Window, 'addEventListener'>(window, 'addEventListener')

  beforeEach(() => {
    addEventListenerSpy.mockClear()
    target = document.createElement('div')
    iframe = document.createElement('iframe')
  })

  it('should call addEventListener', () => {
    watchIframeHeight(iframe, target, id)
    expect(addEventListenerSpy).toBeCalledTimes(1)
    expect(addEventListenerSpy.mock.calls[0][0]).toBe('message')
    expect(addEventListenerSpy.mock.calls[0][2]).toBe(false)
  })

  describe('event callback', () => {
    beforeEach(() => {
      addEventListenerSpy.mockClear()
      target = document.createElement('div')
      iframe = document.createElement('iframe')
    })

    it('should attach iframe.height on firing message', () => {
      target.dataset['height'] = 'auto'
      watchIframeHeight(iframe, target, id)

      const callback = addEventListenerSpy.mock.calls[0][1]
      if (typeof callback !== 'function') return false

      const event = new MessageEvent<IframeMessageEventData>('message', {
        data: {
          id: id,
          height: 500,
        },
      })

      callback(event)
      expect(iframe.height).toBe('500px')
    })

    it('should do nothing on firing message if the data-height is not "auto"', () => {
      target.dataset['height'] = '500px'
      watchIframeHeight(iframe, target, id)

      const callback = addEventListenerSpy.mock.calls[0][1]
      if (typeof callback !== 'function') return false

      const event = new MessageEvent<IframeMessageEventData>('message', {
        data: {
          id: id,
          height: 500,
        },
      })

      callback(event)
      expect(iframe.height).toBe('')
    })

    it('should do nothing on firing message if the message contains different id', () => {
      target.dataset['height'] = 'auto'
      watchIframeHeight(iframe, target, id)

      const callback = addEventListenerSpy.mock.calls[0][1]
      if (typeof callback !== 'function') return false

      const event = new MessageEvent<IframeMessageEventData>('message', {
        data: {
          id: 999,
          height: 500,
        },
      })

      callback(event)
      expect(iframe.height).toBe('')
    })
  })
})
