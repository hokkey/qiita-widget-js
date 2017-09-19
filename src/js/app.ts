import {CachedApiConf, CachedApi} from './CachedApi';
import CachedResponse from './CachedResponse';
import * as QiitaResponse from './QiitaResponse';
import QiitaPane from './QiitaPresenter';
import {CachedApiConfCreator} from "./CachedApiConfCreator";

async function main() {
  const perPage = 20;
  const cacheExpirationDay = 1;
  const confGenerator = new CachedApiConfCreator('https://qiita.com/api/v2/users/y_hokkey/items', cacheExpirationDay, perPage);
  const results: CachedResponse<QiitaResponse.Article[]>[] = [];
  const maxRequests = 10;

  let isFinished = false;
  let counter = 0;

  // 記事がなくなるまでリクエストを続ける
  while (!isFinished) {
    if (counter >= maxRequests) {
      throw new Error('Too many requests!');
    }

    const conf: CachedApiConf = confGenerator.getNextConf();
    const res: CachedResponse<QiitaResponse.Article[]> = await CachedApi.get<QiitaResponse.Article[]>(conf);

    if (res.data.length < perPage) {
      isFinished = true;
      results.push(res);
      counter++;
      break;
    }

    if (res.data.length === 0) {
      isFinished = true;
      counter++;
      break;
    }

    if (res.data.length === perPage) {
      results.push(res);
      counter++;
      continue;
    }

    throw new Error('Something wrong!');
  }

  const pane = new QiitaPane({
    userDest: '#qiita-user',
    userTemplate: '#qiita-user-tpl',
    articleDest: '#qiita-article',
    articleTemplate: '#qiita-article-tpl'
  });

  pane.articles = results.reduce((ary:QiitaResponse.Article[], item: CachedResponse<QiitaResponse.Article[]>) => {
    return ary.concat(item.data);
  }, []);
  pane.user = Object.assign({}, pane.articles[0]['user']);

  pane.renderUser();
  pane.renderArticles();
}

main();
