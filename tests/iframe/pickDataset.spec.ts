import { pickDataset } from '~iframe/pickDataset'
import { QiitaWidgetParam } from '~lib/interface'

describe('pickDataset()', () => {
  let element = document.createElement('div')
  let result: QiitaWidgetParam = {}

  beforeEach(() => {
    element = document.createElement('div')
  })

  it('should parse data from the element.dataset: case 1', () => {
    element.dataset.userId = 'user-id'
    element.dataset.subject = 'subject'
    element.dataset.sortByLike = 'true'
    element.dataset.useShuffle = 'false'
    element.dataset.useTransition = 'true'
    element.dataset.perPage = '1'
    element.dataset.maxToShow = '1.5'
    element.dataset.maxRequest = '0.5'
    element.dataset.filterByLikesFrom = '-1'

    result = pickDataset(element)

    expect(result).toMatchObject({
      userId: 'user-id',
      subject: 'subject',
      sortByLike: true,
      useShuffle: false,
      useTransition: true,
      perPage: 1,
      maxToShow: 1,
      maxRequest: 0,
      filterByLikesFrom: -1,
    })
  })

  it('should parse data from the element.dataset: case 2', () => {
    element.dataset.userId = 'user-id'
    // element.dataset.subject = 'subject'
    element.dataset.sortByLike = 'true'
    element.dataset.useShuffle = 'false'
    // element.dataset.useTransition = 'true'
    element.dataset.perPage = '1'
    element.dataset.maxToShow = '1.5'
    element.dataset.maxRequest = '0.5'
    // element.dataset.filterByLikesFrom = '-1'

    result = pickDataset(element)

    expect(result).toMatchObject({
      userId: 'user-id',
      // subject: 'subject',
      sortByLike: true,
      useShuffle: false,
      // useTransition: true,
      perPage: 1,
      maxToShow: 1,
      maxRequest: 0,
      // filterByLikesFrom: -1,
    })
  })

  it('should throws error if the value is parsed as NaN', () => {
    element.dataset.perPage = 'abc'
    expect(() => {
      pickDataset(element)
    }).toThrow('perPage was parsed as NaN!')
  })
})
