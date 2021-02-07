import { QiitaItems } from '~lib/QiitaItems'
import { QiitaItemsConf, QiitaResponse } from '~lib/interface'
import { QiitaItemsApi } from '~lib/QiitaItemsApi'

jest.mock('~lib/QiitaItemsApi')
jest.mock('~lib/Api')

const conf: QiitaItemsConf = {
  maxToShow: 5,
  useShuffle: false,
  sortByLike: true,
  filterByLikesFrom: 0,
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

describe('QiitaItems', () => {
  let items = new QiitaItems(conf)
  const fetchSpy = jest.spyOn<QiitaItemsApi, 'fetch'>(QiitaItemsApi.prototype, 'fetch')

  beforeEach(() => {
    fetchSpy.mockClear()
    fetchSpy.mockReset()
    items = new QiitaItems(conf)
  })

  describe('validateConf()', () => {
    it('should return config as is if it is correct', () => {
      const validatedConf = QiitaItems.validateConf({
        ...conf,
        maxToShow: 1,
        filterByLikesFrom: 1,
      })
      expect(validatedConf).toEqual<QiitaItemsConf>({
        ...conf,
        maxToShow: 1,
        filterByLikesFrom: 1,
      })
    })

    it('should return modified config if it has incorrect values', () => {
      const validatedConf = QiitaItems.validateConf({
        ...conf,
        maxToShow: -1,
        filterByLikesFrom: -1,
      })
      expect(validatedConf).toEqual<QiitaItemsConf>({
        ...conf,
        maxToShow: 0,
        filterByLikesFrom: 0,
      })
    })
  })

  describe('fetch()', () => {
    it('should call QiitaItemsApi.fetch', () => {
      return items.fetch().then(() => {
        expect(fetchSpy).toBeCalledTimes(1)
      })
    })
  })

  describe('getArticlesToShow()', () => {
    describe('maxToShow option:', () => {
      it('should return number of articles until the value of maxToShow: case 1', () => {
        fetchSpy.mockImplementationOnce(() => {
          return Promise.resolve([articleMock, articleMock, articleMock])
        })

        items = new QiitaItems({
          maxToShow: 2,
          filterByLikesFrom: 0,
        })

        return items.fetch().then(() => {
          const articles = items.getArticlesToShow()
          expect(articles.length).toBe(2)
        })
      })

      it('should return number of articles until the value of maxToShow: case 2', () => {
        fetchSpy.mockImplementationOnce(() => {
          return Promise.resolve([articleMock, articleMock, articleMock])
        })

        items = new QiitaItems({
          maxToShow: 10,
          filterByLikesFrom: 0,
        })

        return items.fetch().then(() => {
          const articles = items.getArticlesToShow()
          expect(articles.length).toBe(3)
        })
      })

      it('should return nothing if maxToShow is zero', () => {
        fetchSpy.mockImplementationOnce(() => {
          return Promise.resolve([articleMock, articleMock, articleMock])
        })

        items = new QiitaItems({
          maxToShow: 0,
          filterByLikesFrom: 0,
        })

        return items.fetch().then(() => {
          const articles = items.getArticlesToShow()
          expect(articles.length).toBe(0)
        })
      })
    })

    describe('filterByLikesFrom option:', () => {
      it('should return articles with no filters if likes_count is 0', () => {
        fetchSpy.mockImplementationOnce(() => {
          return Promise.resolve([
            {
              ...articleMock,
              likes_count: 2,
            },
            {
              ...articleMock,
              likes_count: 1,
            },
            {
              ...articleMock,
              likes_count: 0,
            },
          ])
        })

        items = new QiitaItems({
          filterByLikesFrom: 0,
        })

        return items.fetch().then(() => {
          const articles = items.getArticlesToShow()
          expect(articles.length).toBe(3)
        })
      })

      it('should return filtered articles by likes_count if likes_count is greater than 1', () => {
        fetchSpy.mockImplementationOnce(() => {
          return Promise.resolve([
            {
              ...articleMock,
              likes_count: 2,
            },
            {
              ...articleMock,
              likes_count: 1,
            },
            {
              ...articleMock,
              likes_count: 0,
            },
          ])
        })

        items = new QiitaItems({
          filterByLikesFrom: 1,
        })

        return items.fetch().then(() => {
          const articles = items.getArticlesToShow()
          expect(articles.length).toBe(2)
        })
      })
    })

    describe('sortByLike and useShuffle option:', () => {
      it('should return articles sorted by likes_count if sortByLike is true and useShuffle is false', () => {
        fetchSpy.mockImplementationOnce(() => {
          return Promise.resolve([
            {
              ...articleMock,
              likes_count: 0,
              id: 'a',
            },
            {
              ...articleMock,
              likes_count: 5,
              id: 'b',
            },
            {
              ...articleMock,
              likes_count: 1,
              id: 'c',
            },
          ])
        })

        items = new QiitaItems({
          sortByLike: true,
          useShuffle: false,
        })

        return items.fetch().then(() => {
          const idOrderTests = Array(10)
            .fill(true)
            .map(() => {
              return JSON.stringify(items.getArticlesToShow().map((a) => a.id))
            })
          const idOrderTestsSet = new Set(idOrderTests)
          expect(idOrderTestsSet.size).toBe(1)
          expect(JSON.parse(idOrderTests[0])).toEqual(['b', 'c', 'a'])
        })
      })

      it('should return articles without changing the order if sortByLike and useShuffle are false', () => {
        fetchSpy.mockImplementationOnce(() => {
          return Promise.resolve([
            {
              ...articleMock,
              likes_count: 0,
              id: 'a',
            },
            {
              ...articleMock,
              likes_count: 5,
              id: 'b',
            },
            {
              ...articleMock,
              likes_count: 1,
              id: 'c',
            },
          ])
        })

        items = new QiitaItems({
          sortByLike: false,
          useShuffle: false,
        })

        return items.fetch().then(() => {
          const idOrderTests = Array(10)
            .fill(true)
            .map(() => {
              return JSON.stringify(items.getArticlesToShow().map((a) => a.id))
            })
          const idOrderTestsSet = new Set(idOrderTests)
          expect(idOrderTestsSet.size).toBe(1)
          expect(JSON.parse(idOrderTests[0])).toEqual(['a', 'b', 'c'])
        })
      })

      it('should return articles which have randomized order the order if useShuffle is true and sortByLike is true', () => {
        fetchSpy.mockImplementationOnce(() => {
          return Promise.resolve([
            {
              ...articleMock,
              id: 'a',
            },
            {
              ...articleMock,
              id: 'b',
            },
            {
              ...articleMock,
              id: 'c',
            },
          ])
        })

        items = new QiitaItems({
          useShuffle: true,
          sortByLike: true,
        })

        return items.fetch().then(() => {
          const idOrderTests = Array(10)
            .fill(true)
            .map(() => {
              return JSON.stringify(items.getArticlesToShow().map((a) => a.id))
            })
          const idOrderTestsSet = new Set(idOrderTests)
          expect(idOrderTestsSet.size).toBeGreaterThanOrEqual(2)
        })
      })

      it('should return articles which have randomized order the order if useShuffle is true and sortByLike is false', () => {
        fetchSpy.mockImplementationOnce(() => {
          return Promise.resolve([
            {
              ...articleMock,
              id: 'a',
            },
            {
              ...articleMock,
              id: 'b',
            },
            {
              ...articleMock,
              id: 'c',
            },
          ])
        })

        items = new QiitaItems({
          useShuffle: true,
          sortByLike: false,
        })

        return items.fetch().then(() => {
          const idOrderTests = Array(10)
            .fill(true)
            .map(() => {
              return JSON.stringify(items.getArticlesToShow().map((a) => a.id))
            })
          const idOrderTestsSet = new Set(idOrderTests)
          expect(idOrderTestsSet.size).toBeGreaterThanOrEqual(2)
        })
      })
    })
  })

  describe('getUserToShow()', () => {
    let user: QiitaResponse.User = articleMock.user

    beforeAll(() => {
      fetchSpy.mockImplementationOnce(() => {
        return Promise.resolve([
          {
            ...articleMock,
            likes_count: 0,
          },
          {
            ...articleMock,
            likes_count: 5,
          },
          {
            ...articleMock,
            likes_count: 1,
          },
        ])
      })
      return items.fetch().then(() => {
        user = items.getUserToShow()
      })
    })

    it('should return a user with qiita URL', () => {
      expect(user.url).toBe('https://qiita.com/my-user')
    })

    it('should return a user with likes_count summarized from all of the articles', () => {
      expect(user.likes_count).toBe(6)
    })
  })
})
