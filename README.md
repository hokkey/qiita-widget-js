# Qiita Widget JS

QiitaAPIv2を通じてQiitaのユーザー情報を表示するTypeScript製ウィジェット。
単体で動作するiframe版と、柔軟にカスタマイズできるライブラリ版があります。

## iframe版

[ライブデモ](https://codepen.io/hokkey/pen/RLRzEE?editors=1000)

![](https://user-images.githubusercontent.com/6197292/30715017-e1307794-9f4f-11e7-92c3-07323bb71e47.png)

```html
<div class="js-qiita-widget"
  data-user-id="qiita"
  data-use-shuffle="true"
  data-sort-by-like="true"
  data-per-page="30"
  data-expiration-day="1"
  data-max-request="10"
  data-max="5">
</div>
<script src="https://cdn.rawgit.com/hokkey/qiita-widget-js/be967c4f/dist/iframe.js"></script>
```

## ライブラリ版

ライブラリ版ではHTMLテンプレート/CSSを自由にカスタマイズできます。

```html:index.html

<section class="qiita-widget">
  <header class="qiita-widget__header qiita-user" id="qiita-user"></header>
  <section class="qiita-widget__articles">
    <h2 class="qiita-widget__articles-head">人気の投稿</h2>
    <ul id="qiita-article" class="qiita-article-list"></ul>
  </section>
</section>

<template id="qiita-user-tpl">
  <p class="qiita-user__image"><img class="qiita-user__img js-profile-image-url" src="" alt=""/></p>

  <div class="qiita-user__title">
    <a class="qiita-user__url js-url" target="_blank"><h1 class="qiita-user__id js-id"></h1></a>

    <p class="qiita-user__items">
      <span class="qiita-user__items-num js-items-count"></span>
      <span class="qiita-user__items-unit">Items</span>
    </p>

    <p class="qiita-user__likes">
      <span class="qiita-user__likes-num js-likes-count"></span>
      <span class="qiita-user__likes-unit">Contribution</span>
    </p>

  </div>
</template>

<template id="qiita-article-tpl">
  <li class="qiita-article-list__item">
    <a class="qiita-article js-url" target="_blank">
      <h3 class="qiita-article__title js-title"></h3>
    </a>
  </li>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.rawgit.com/hokkey/qiita-widget-js/be967c4f/dist/lib.js"></script>

<script>
  (function () {
    new QiitaWidget({
      userId: 'qiita',
      useShuffle: true,
      sortByLike: true,
      expirationDay: 1,
      perPage: 100,
      max: 5
    }).init();
  })();
</script>
```

## オプション

- userId ユーザーID
  - 表示する情報の取得元となるQiitaのユーザーID
- cacheExpirationDay ブラウザキャッシュ有効日数
  - QiitaAPIの制限を緩和するために、日単位でlocalStorageへ情報をキャッシュします
- useShuffle 投稿シャッフル
  - リロードの度に異なる順番で記事を表示できます
- sortByLike 「いいね」順ソート機能
  - 投稿を「いいね」の件数でソートして表示できます
  
## ToDo

- デザインの拡充
- エラー処理
- ユニットテストの追加
- ドキュメントの拡充
- npmへの公開

## Author

https://qiita.com/y_hokkey
