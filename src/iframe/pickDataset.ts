import { QiitaWidgetParam } from '~lib/interface'
import { toBoolean } from '~lib/util'

export function pickDataset(el: HTMLElement): QiitaWidgetParam {
  const result: QiitaWidgetParam = {}

  // set string value
  ;['userId', 'subject'].forEach((key) => {
    const data = el.dataset[key]
    if (typeof data === 'string') {
      result[key] = data
    }
  })

  // set as boolean value
  ;['sortByLike', 'useShuffle', 'useTransition'].forEach((key) => {
    const data = el.dataset[key]
    if (typeof data === 'string') {
      result[key] = toBoolean(data)
    }
  })

  // set as number value
  ;['perPage', 'maxToShow', 'maxRequest', 'cacheAgeMin', 'filterByLikesFrom'].forEach((key) => {
    const data = el.dataset[key]

    if (typeof data === 'string') {
      const num = parseInt(data, 10)

      if (Number.isNaN(num)) {
        throw new Error(`${key} was parsed as NaN!`)
      }

      result[key] = num
    }
  })

  return result
}
