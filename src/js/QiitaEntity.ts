interface ApiInterface {
  fetch(endpoint: string): Promise<any>
}

interface CachedApiInterface extends ApiInterface {
  cacheExpiration: number
}

interface UserEntityInterface {
  userId: string,
  endpoint: string,
  htmlTemplateId: string,
  htmlDestId: string,
  api: CachedApi,
  responseData?: any,
  htmlTemplate?: HTMLElement
  htmlDest?: HTMLElement
}


class QiitaUser implements UserEntityInterface {

  endpoint: string = 'https://qiita.com/api/v2';

  constructor(
    public api: CachedApiInterface,
    public userId: string,
    public htmlTemplateId: string,
    public htmlDestId: string
  ) {
    this.endpoint = `${this.endpoint}/user/${userId}`;
  }
}

class QiitaArticles extends QiitaUser {

}

interface QiitaInterface {
  api: CachedApi,
  userId: string,
  userClient: QiitaUser,
  articleClient: QiitaArticles,
}

class Qiita implements QiitaInterface {
  api: CachedApi = new CachedApi(7);
  userClient: QiitaUser;
  articleClient: QiitaArticles;

  constructor(public userId: string) {
    this.userClient = new QiitaUser(this.api, userId, 'q-user-tmpl', 'q-user');
  }
}
