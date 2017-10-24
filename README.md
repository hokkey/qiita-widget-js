# hokey/qiita-widget-js

[![npm version](https://badge.fury.io/js/qiita-widget.svg)](https://badge.fury.io/js/qiita-widget)![build state](https://travis-ci.org/hokkey/qiita-widget-js.svg?branch=master)[![Dependency Status](https://gemnasium.com/badges/github.com/hokkey/qiita-widget-js.svg)](https://gemnasium.com/github.com/hokkey/qiita-widget-js)


Qiita API V2に対応した、Qiitaのユーザー情報を表示するTypeScript製ブログウィジェットです。
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
  filterByLikesFrom: 0,     // 表示する記事の最低いいね数(0でフィルタ無効)
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

## Changelog

- 0.4.0
  - いいね数で表示記事をフィルタできるパラメータ`filterByLikesFrom`を追加
- 0.3.1
  - ライブラリ版がimportできなかった問題を修正
- 0.3.0
  - 依存ライブラリをバンドルした配布用ファイルを追加
- 0.2.1
  - ビルド設定の修正
- 0.2.0
  - 同じページ内へ複数のインスタンスを作成できるように修正
- 0.1.0
  - NPMへの公開準備
  - コードレビュー指摘箇所の修正
  
## Author

* [Yuma Hori](https://media-massage.net/profile/)

## Acknowledgements

qiita-widget-js uses following libraries:

* [axios](https://www.npmjs.com/package/axios), MIT License
* [localforage](https://www.npmjs.com/package/localforage), Apache License Version 2.0
* [axios-cache-adapter](https://www.npmjs.com/package/axios-cache-adapter), MIT License
