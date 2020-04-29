# hokey/qiita-widget-js

[![npm version](https://badge.fury.io/js/qiita-widget.svg)](https://badge.fury.io/js/qiita-widget) ![build state](https://travis-ci.org/hokkey/qiita-widget-js.svg?branch=master) ![Dependency Status](https://david-dm.org/hokkey/qiita-widget-js.svg)


Qiita API V2に対応した、Qiitaのユーザー情報を表示するTypeScript製ブログウィジェットです。
コピペで簡単に導入できるiframe版と、柔軟にカスタマイズできるライブラリ版があります。

[ライブデモ](https://media-massage.net/qiita-widget-js/)

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
  cacheAgeMin: 15,          // JSONレスポンスのキャッシュ有効時間(分)
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

# ファイル監視 + 開発サーバ立ち上げ (事前にbrowser-syncのglobalインストールが必要)
npm run serve
```

## 仕様

* **InternetExplorerに非対応です。**
* 公開されている投稿の「いいね」からContributionを算出しているため、Qiitaのプロフィールページの数値と完全に一致しないことがあります。

## Changelog

- 2.0.1
  - 軽微なバグフィックス
- 2.0.0
  - axiosを廃止してFetch APIに置き換え
  - Webpackをv3系からv4系に置き換え
  - browser-syncをdevDependenciesから削除
- 1.0.1
  - バグフィックス
- 1.0.0
  - キャッシュの実装を[lscache](https://www.npmjs.com/package/lscache)へ変更
  - **breaking** パラメータ名`cacheAgeMin`, `data-cache-age-min`を追加
  - **breaking** パラメータ名`cacheAge`, `data-cache-age`を削除
- 0.4.4
  - package.jsonを修正
- 0.4.3
  - ビルド失敗の修正
  - package-lock.jsonを追加
  - CIで利用するNodeバージョンを変更
  - ドキュメント更新
- 0.4.2
  - tsconfig.jsonで`strictNullChecks`を有効化
  - axios-cache-adapterを2.0.0へ更新
  - localforageを1.5.3へ更新
- 0.4.1
  - axiosをdependenciesからdevDependenciesへ移動
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
* [lscache](https://www.npmjs.com/package/lscache), Apache License Version 2.0
