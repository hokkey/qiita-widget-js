import QiitaWidget from '@/QiitaWidget'
;(() => {
  const elem = document.querySelector<HTMLElement>('.js-qiita-widget-lib')
  if (!elem) return
  new QiitaWidget(elem, {
    userId: 'y_hokkey',
    useShuffle: true,
    sortByLike: true,
    perPage: 100,
    maxToShow: 10,
    useTransition: true,
    filterByLikesFrom: 100,
  }).init()
})()
