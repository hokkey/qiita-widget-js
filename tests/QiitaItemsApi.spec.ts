import { QiitaItemsApi } from '@/QiitaItemsApi'
import { Api } from '@/Api'
import { QiitaItemsApiConf, QiitaResponse, RequestConf } from '@/interface'

jest.mock('@/Api')

const conf: QiitaItemsApiConf = {
  userId: 'qiita',
  maxRequest: 5,
  perPage: 100,
  cacheAgeMin: 15,
}

const articleMock = {
  body: 'article-body',
  coediting: true,
  comments_count: 1,
  created_at: '2000-01-01T00:00:00+00:00',
  id: 'article-id',
  likes_count: 2,
  private: true,
  reactions_count: 3,
  rendered_body: '<p>rendered-body</p>',
  tags: [],
  title: 'article-title',
  updated_at: '2000-01-01T00:00:00+00:00',
  url: './article-url/',
  user: {
    description: '',
    facebook_id: '',
    followers_count: 0,
    github_login_name: '',
    id: 'my-user',
    items_count: 0,
    linkedin_id: '',
    location: '',
    name: '',
    organization: '',
    permanent_id: 0,
    profile_image_url: '',
    twitter_screen_name: '',
    website_url: '',
    likes_count: 0,
    url: '',
  },
}

describe('QiitaItemsApi', () => {
  const fetchMock = jest.spyOn<Api, 'fetch'>(Api.prototype, 'fetch')

  beforeEach(() => {
    fetchMock.mockClear()
  })

  describe('validateConf()', () => {
    it('should return config as is if it is correct', () => {
      const validatedConf = QiitaItemsApi.validateConf({
        ...conf,
        perPage: 1,
        maxRequest: 1,
      })
      expect(validatedConf).toEqual<QiitaItemsApiConf>({
        ...conf,
        perPage: 1,
        maxRequest: 1,
      })

      const validatedConf2 = QiitaItemsApi.validateConf({
        ...conf,
        perPage: 100,
        maxRequest: 1,
      })
      expect(validatedConf2).toEqual<QiitaItemsApiConf>({
        ...conf,
        perPage: 100,
        maxRequest: 1,
      })
    })

    it('should return modified config if it has incorrect values', () => {
      const validatedConf = QiitaItemsApi.validateConf({
        ...conf,
        perPage: 101,
        maxRequest: -1,
      })
      expect(validatedConf).toEqual<QiitaItemsApiConf>({
        ...conf,
        perPage: 100,
        maxRequest: 0,
      })

      const validatedConf2 = QiitaItemsApi.validateConf({
        ...conf,
        perPage: 0,
        maxRequest: -1,
      })
      expect(validatedConf2).toEqual<QiitaItemsApiConf>({
        ...conf,
        perPage: 1,
        maxRequest: 0,
      })
    })
  })

  describe('fetch()', () => {
    let itemsApi = new QiitaItemsApi(conf)

    // create mock data for 5 pages of 50 entries per page
    let mockRes: QiitaResponse.Article[][] = [[]]

    beforeAll(() => {
      fetchMock.mockImplementation((request: RequestConf) => {
        const perPage = request.params.per_page
        const page = request.params.page

        if (typeof page === 'number') {
          const target: unknown = mockRes[page - 1]

          if (Array.isArray(target) && typeof perPage === 'number') {
            return Promise.resolve(target.slice(0, perPage))
          }
        }

        return Promise.reject()
      })
    })

    it('fetch any number of times until maxRequest or the api returns less article numbers than perPage: case 1', () => {
      mockRes = [
        Array(50)
          .fill(true)
          .map(() => articleMock),
        Array(50)
          .fill(true)
          .map(() => articleMock),
        Array(50)
          .fill(true)
          .map(() => articleMock),
        Array(50)
          .fill(true)
          .map(() => articleMock),
        [],
      ]
      itemsApi = new QiitaItemsApi({
        ...conf,
        perPage: 50,
        maxRequest: 5,
      })
      return itemsApi.fetch().then(() => {
        expect(fetchMock).toBeCalledTimes(5)
      })
    })

    it('fetch any number of times until maxRequest or the api returns less article numbers than perPage: case 2', () => {
      mockRes = [
        Array(50)
          .fill(true)
          .map(() => articleMock),
        Array(50)
          .fill(true)
          .map(() => articleMock),
        Array(25)
          .fill(true)
          .map(() => articleMock),
        [],
      ]
      itemsApi = new QiitaItemsApi({
        ...conf,
        perPage: 50,
        maxRequest: 5,
      })
      return itemsApi.fetch().then(() => {
        expect(fetchMock).toBeCalledTimes(3)
      })
    })

    it('fetch any number of times until maxRequest or the api returns less article numbers than perPage: case 3', () => {
      mockRes = [
        Array(50)
          .fill(true)
          .map(() => articleMock),
        Array(50)
          .fill(true)
          .map(() => articleMock),
        Array(50)
          .fill(true)
          .map(() => articleMock),
        Array(50)
          .fill(true)
          .map(() => articleMock),
        [],
      ]
      itemsApi = new QiitaItemsApi({
        ...conf,
        perPage: 50,
        maxRequest: 1,
      })
      return itemsApi.fetch().then(() => {
        expect(fetchMock).toBeCalledTimes(1)
      })
    })

    it('fetch any number of times until maxRequest or the api returns less article numbers than perPage: case 4', () => {
      mockRes = [
        Array(50)
          .fill(true)
          .map(() => articleMock),
        Array(50)
          .fill(true)
          .map(() => articleMock),
        Array(25)
          .fill(true)
          .map(() => articleMock),
        [],
      ]
      itemsApi = new QiitaItemsApi({
        ...conf,
        perPage: 100,
        maxRequest: 5,
      })
      return itemsApi.fetch().then(() => {
        expect(fetchMock).toBeCalledTimes(1)
      })
    })
  })
})
