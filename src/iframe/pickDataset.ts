import {QiitaWidgetParam} from "../Interface";
import {isType, toBoolean} from "../Util";

export function pickDataset(el: HTMLElement): QiitaWidgetParam {

  const result: QiitaWidgetParam = {};

  // set string value
  if (isType(el.dataset['userId'], 'string')) {
    result['userId'] = el.dataset['userId'];
  }

  // set boolean value
  ['sortByLike', 'useShuffle'].forEach((key:string) => {
    if (isType(el.dataset[key], 'string')) {
      result[key] = toBoolean(el.dataset[key]);
    }
  });

  // set number value
  ['perPage', 'maxToShow', 'maxRequest', 'cacheAge'].forEach((key:string) => {
    if (isType(el.dataset[key], 'string')) {
      result[key] = parseInt(el.dataset[key], 10);
    }
  });

  return result;
}
