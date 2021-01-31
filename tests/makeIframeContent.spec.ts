import { makeIframeContent } from '#/iframe/makeIframeContent'

describe('makeIframeContent', () => {
  const id = 1
  const data = {
    userId: 'abc',
    container: '123',
    filterByLikesFrom: 123,
    perPage: 1,
    cacheAgeMin: 2,
    maxRequest: 3,
    maxToShow: 4,
    useShuffle: true,
    sortByLike: false,
  }
  let result = ''

  beforeEach(() => {
    result = makeIframeContent(data, id)
  })

  it('should return HTML content which has <style> section', () => {
    expect(result.includes('<style>')).toBe(true)
  })

  it('should return HTML content which has <div id="widget"> section', () => {
    expect(result.includes('<div id="widget">')).toBe(true)
  })

  it('should return HTML content which has <script> section', () => {
    expect(result.includes('<script>')).toBe(true)
    expect(result.includes('id: 1')).toBe(true)
    expect(result.includes('is-iframe-loading')).toBe(true)
    expect(result.includes('parent.window.postMessage(')).toBe(true)
    expect(result.includes(JSON.stringify(data))).toBe(true)
  })
})
