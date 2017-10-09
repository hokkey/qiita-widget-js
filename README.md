# hokey/qiita-widget-js

![build state](https://travis-ci.org/hokkey/qiita-widget-js.svg?branch=master)

Qiita API v2に対応した、Qiitaのユーザー情報を表示するTypeScript製ブログウィジェットです。
コピペで簡単に導入できるiframe版と、柔軟にカスタマイズできるライブラリ版があります。

[デモサイト](https://media-massage.net/qiita-widget-js/)

## npm/webpackでの利用方法

```bash
npm i qiita-widget --save-dev

```
```js
import QiitaWidget from 'qiita-widget';

const container = document.querySelector('.js-qiita-widget');
new QiitaWidget(container, {
  subject: '人気の記事',      // 見出し
  userId: 'qiita',          // QiitaのユーザーID
  useShuffle: false,        // trueで表示記事をランダムに選択する
  sortByLike: true,         // trueで投稿を「いいね」数順でソートする
  useTransition: true,      // trueでロード直後のアニメーションを表示
  maxToShow: 5,             // 最終的に表示する記事の件数
  cacheAge: 15 * 60 * 1000, // JSONレスポンスのキャッシュ有効時間(ミリ秒)
  perPage: 100,             // 一度のリクエストで取得する記事数(1〜100)
  maxRequest: 10            // perPage * maxRequest = 取得を試みる最大記事件数 
}).init();

```

## 開発ビルド

```bash
git clone https://github.com/hokkey/qiita-widget-js.git
cd qiita-widget-js
npm i

# プロダクションビルド
npm run build

# ファイル監視 + 開発サーバ立ち上げ
npm run serve
```

## 仕様

* IE11を含むすべてのIEに未対応です。
* 公開されている投稿の「いいね」からContributionを算出しているため、Qiitaのプロフィールページの数値と完全に一致しないことがあります。

## ToDo

- エラー処理
- ユニットテストの追加
- ドキュメントの拡充
- デザインの拡充

## Author

https://media-massage.net/profile/
