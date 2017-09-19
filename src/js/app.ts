import {QiitaWidget} from "./QiitaWidget";

const widget = new QiitaWidget({
  userId: 'y_hokkey',
  useShuffle: true,
  sortByLike: true,
  expirationDay: 1,
  perPage: 20,
  max: 5
}).init();
