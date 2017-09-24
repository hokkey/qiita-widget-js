import {QiitaWidgetParam} from "../Interface";

import * as CSS from "css/iframe.scss";
// lib.js is included via raw-loader
import * as LIB from "../../dist/lib.js";

export function makeIframeContent(data: QiitaWidgetParam): string {
  return `

<style>${CSS}</style>

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
<script>${LIB}</script>

<script>
  (function() {
    new QiitaWidget(${JSON.stringify(data)}).init();
  })();
</script>`;
  }
