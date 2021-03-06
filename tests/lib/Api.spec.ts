import * as lscache from 'lscache'
import { default as fetchMock } from 'jest-fetch-mock'
import { Api } from '~lib/Api'

const MOCK_REQUEST = {
  url: 'http://localhost',
  maxRequest: 5,
  cacheAgeMin: -1,
  params: {
    param: 'abc',
    param2: 123,
  },
}

const MOCK_REQUEST_WITH_CACHE = {
  url: 'http://localhost',
  maxRequest: 5,
  cacheAgeMin: 15,
  params: {
    param: 'def',
    param2: 321,
  },
}

const MOCK_RES = JSON.stringify({
  test: 'test',
})

const MOCK_RES_2 = JSON.stringify({
  text: 'cached',
})

describe('Api', () => {
  /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
  beforeAll(() => {
    fetchMock.enableMocks()
  })

  describe('normal behavior', () => {
    describe('on cache empty:', () => {
      beforeEach(() => {
        fetchMock.resetMocks()
        fetchMock.mockResponse(MOCK_RES)
      })

      it('can create an instance', () => {
        expect(new Api()).toBeInstanceOf(Api)
        return
      })

      it('fetches API', (): Promise<void> => {
        const api = new Api()
        return expect(api.fetch(MOCK_REQUEST)).resolves.toStrictEqual({ test: 'test' })
      })

      it('calls API only once', (): Promise<void> => {
        const api = new Api()
        return api.fetch(MOCK_REQUEST).then(() => {
          expect(fetchMock.mock.calls.length).toBe(1)
        })
      })

      it('calls API with params', (): Promise<void> => {
        const api = new Api()
        return api.fetch(MOCK_REQUEST).then(() => {
          expect(fetchMock.mock.calls[0][0]).toBe('http://localhost/?param=abc&param2=123')
        })
      })
    })

    describe('with cache:', () => {
      beforeEach(() => {
        fetchMock.resetMocks()
        fetchMock.mockResponse(MOCK_RES_2)
      })

      it('fetches URL and store responce in cache', (): Promise<void> => {
        const api = new Api()
        return api.fetch(MOCK_REQUEST_WITH_CACHE).then(() => {
          const expectedKey = 'http://localhost/?param=def&param2=321'
          const cache = <unknown>lscache.get(expectedKey)
          return expect(cache).toStrictEqual({ text: 'cached' })
        })
      })

      it('does not call API when browser already has cache', (): Promise<void> => {
        const api = new Api()
        return api.fetch(MOCK_REQUEST_WITH_CACHE).then(() => {
          expect(fetchMock.mock.calls.length).toBe(0)
        })
      })
    })
  })

  describe('fallback behavior', () => {
    beforeEach(() => {
      fetchMock.resetMocks()
    })

    it('should return error on fetch rejecting', (): Promise<void> => {
      fetchMock.mockAbortOnce()
      const api = new Api()
      return expect(api.fetch(MOCK_REQUEST)).rejects.toThrow()
    })

    it('should reject and throw an error if the returned HTTP status code is not 200', () => {
      fetchMock.mockResponse(JSON.stringify({}), { status: 404 })
      const api = new Api()
      return expect(api.fetch(MOCK_REQUEST)).rejects.toThrow('404')
    })
  })
})
