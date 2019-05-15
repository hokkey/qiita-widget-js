import {QiitaWidgetParam} from "../interface";
import {isType, toBoolean} from "../util";

export function pickDataset(el: HTMLElement): QiitaWidgetParam {

  const result: QiitaWidgetParam = {};

  // set string value
  ['userId', 'subject'].forEach((key: string) => {
    if (isType(el.dataset[key], 'string')) {
      result[key] = <string>el.dataset[key];
    }
  });

  // set boolean value
  ['sortByLike', 'useShuffle', 'useTransition'].forEach((key: string) => {
    if (isType(el.dataset[key], 'string')) {
      result[key] = toBoolean(<string>el.dataset[key]);
    }
  });

  // set number value
  ['perPage', 'maxToShow', 'maxRequest', 'cacheAgeMin', 'filterByLikesFrom'].forEach((key: string) => {
    if (isType(el.dataset[key], 'string')) {
      const num = parseInt(<string>el.dataset[key], 10);

      if (Number.isNaN(num)) {
        throw new Error(`${key} was parsed as NaN!`);
      }

      result[key] = num;
    }
  });

  return result;
}
