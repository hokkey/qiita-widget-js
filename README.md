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
new QiitaWidget({
  userId: 'qiita',
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
