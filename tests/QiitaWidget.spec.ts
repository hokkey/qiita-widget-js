import QiitaWidget from '#/QiitaWidget';
import fetchMock from 'jest-fetch-mock';

describe('QiitaWidget class', () => {

  beforeEach(() => {
    fetchMock.enableMocks();
    document.body.innerHTML = `
      <div class="js-qiita-widget">
        <div class="js-qiita-user"></div>
        <div class="js-subject"></div>
        <div class="js-qiita-article"></div>
      </div>
      <template id="qiita-user-tpl"></template>
      <template id="qiita-article-tpl"></template>
    `;
  });

  it('can create an instance', (): void => {
    const widget = new QiitaWidget(
      <HTMLElement>document.querySelector('.js-qiita-widget'),
      {}
    );
  });

});
