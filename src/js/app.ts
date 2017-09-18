import CachedApi from './CachedApi';
import CachedResponse from './CachedResponse';
import QiitaPane from './QiitaPane';

async function main() {
  const res: CachedResponse = await CachedApi.get('https://qiita.com/api/v2/users/y_hokkey/items', 1);
  const pane = new QiitaPane('#qiita-user-tmpl', '#qiita-article-tmpl');

  pane.articles = res.res;
  pane.user = res.res[0]['user'];
  pane.renderArticles();
}

main();
