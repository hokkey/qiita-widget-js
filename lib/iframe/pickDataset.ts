import {QiitaWidgetParam} from "../interface";
import {isType, toBoolean} from "../util";

export function pickDataset(el: HTMLElement): QiitaWidgetParam {

  const result: QiitaWidgetParam = {};

  // set string value
  if (isType(el.dataset['userId'], 'string')) {
    result['userId'] = el.dataset['userId'];
  }

  // set boolean value
  ['sortByLike', 'useShuffle', 'useTransition'].forEach((key:string) => {
    if (isType(el.dataset[key], 'string')) {
      result[key] = toBoolean(el.dataset[key]);
    }
  });

  // set number value
  ['perPage', 'maxToShow', 'maxRequest', 'cacheAge'].forEach((key:string) => {
    if (isType(el.dataset[key], 'string')) {
      const num = parseInt(el.dataset[key], 10);

      if (Number.isNaN(num)) {
        throw new Error(`${key} was parsed as NaN!`);
      }

      result[key] = num;
    }
  });

  return result;
}
