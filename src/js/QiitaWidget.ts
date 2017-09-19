import {QiitaResponse, QiitaWidgetConf, QiitaWidgetParam} from "./Interface";
import {QiitaPresenter} from "./QiitaPresenter";
import {CachedApiConfCreator} from "./CachedApiConfCreator";
import CachedResponse from "./CachedResponse";
import {CachedApi} from "./CachedApi";

export class QiitaWidget {

  static defaultConf: QiitaWidgetConf = {
    userId: 'qiita',
    perPage: 20,
    expirationDay: 1,
    maxRequest: 10
  };

  presenter: QiitaPresenter;

  private conf: QiitaWidgetConf;
  private endpoint: string;
  private apiConfCreator: CachedApiConfCreator;
  private dataList: CachedResponse<QiitaResponse.Article[]>[];

  constructor(conf: QiitaWidgetParam) {
    this.conf = Object.assign({}, QiitaWidget.defaultConf, conf);
    this.endpoint = `https://qiita.com/api/v2/users/${this.conf.userId}/items`;
    this.apiConfCreator = new CachedApiConfCreator(this.endpoint, this.conf);
    this.dataList = [];
    this.presenter = new QiitaPresenter(this.conf);
  }

  async init():Promise<void> {
    await this.fetchList();
    this.parseDataList();
    this.render();
  }

  private render():void {
    this.presenter.renderUser();
    this.presenter.renderArticles();
  }

  // 記事がなくなるか、最大試行回数に到達するまでリクエストを続ける
  private async fetchList(): Promise<void> {
    let counter = 0;
    while (counter < this.conf.maxRequest) {
      if (await this.fetchOnce()) {
        counter++;
        continue;
      }
      break;
    }
    return;
  }

  private async fetchOnce(): Promise<boolean> {
    const res: CachedResponse<QiitaResponse.Article[]> =
      await CachedApi.get<QiitaResponse.Article[]>(this.apiConfCreator.getNextConf());

    // 記事数0：ループ終了
    if (res.data.length === 0) {
      return false;
    }

    // 記事数がperPage未満：結果を追加してループ終了
    if (res.data.length < this.conf.perPage) {
      this.dataList = this.dataList.concat(res);
      return false;
    }

    // 記事数がperPageと同値以上：結果を追加してループ継続
    this.dataList = this.dataList.concat(res);
    return true;
  }

  private parseDataList(): void {
    // Set articles first to count all likes
    this.presenter.articles = this.dataList.reduce((result: QiitaResponse.Article[], article: CachedResponse<QiitaResponse.Article[]>) => {
      return result.concat(article.data);
    }, []);

    this.presenter.user = Object.assign({}, this.dataList[0].data[0].user);
    this.presenter.user.likes_count = this.presenter.countAllLikes();
    this.presenter.user.url = `https://qiita.com/${this.presenter.user.id}`;
  }
}
