import QiitaWidget from '~lib/QiitaWidget'
import { QiitaPresenter } from '~lib/QiitaPresenter'
import { QiitaItems } from '~lib/QiitaItems'
import { QiitaWidgetParam } from '~lib/interface'

jest.mock('~lib/QiitaPresenter')
jest.mock('~lib/QiitaItems')

const conf: QiitaWidgetParam = {
  userId: 'user-id',
  container: '.my-container',
  filterByLikesFrom: 1,
  perPage: 10,
  cacheAgeMin: 5,
  maxRequest: 2,
  maxToShow: 5,
  useShuffle: false,
  sortByLike: true,
}

describe('QiitaWidget', () => {
  const container = document.createElement('div')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('constructor()', () => {
    it('should create a QiitaItems instance and a QiitaPresenter instance', () => {
      new QiitaWidget(container, conf)
      expect(QiitaItems).toBeCalledTimes(1)
      expect(QiitaItems).toBeCalledWith({
        userId: 'user-id',
        container: '.my-container',
        filterByLikesFrom: 1,
        perPage: 10,
        cacheAgeMin: 5,
        maxRequest: 2,
        maxToShow: 5,
        useShuffle: false,
        sortByLike: true,
      })

      const QiitaPresenterMock = (QiitaPresenter as unknown) as jest.MockedClass<
        typeof QiitaPresenter
      >

      expect(QiitaPresenter).toBeCalledTimes(1)
      expect(QiitaPresenterMock.mock.calls[0][0]).toBe(container)
      expect(QiitaPresenterMock.mock.calls[0][1]).toBeInstanceOf(QiitaItems)
      expect(QiitaPresenterMock.mock.calls[0][2]).toEqual({
        userId: 'user-id',
        container: '.my-container',
        filterByLikesFrom: 1,
        perPage: 10,
        cacheAgeMin: 5,
        maxRequest: 2,
        maxToShow: 5,
        useShuffle: false,
        sortByLike: true,
      })
    })
  })

  describe('init()', () => {
    it('should call QiitaItems.fetch and QiitaPresenter.render', () => {
      return new QiitaWidget(container, conf).init().then(() => {
        /* eslint-disable @typescript-eslint/unbound-method */
        expect(QiitaItems.prototype.fetch).toBeCalledTimes(1)
        expect(QiitaPresenter.prototype.render).toBeCalledTimes(1)
      })
    })
  })
})
