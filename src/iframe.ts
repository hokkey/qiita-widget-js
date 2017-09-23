import {QiitaWidgetParam} from 'lib/Interface';
import * as CSS from "./css/style.scss";

(() => {

  const dests = document.querySelectorAll('.js-qiita-widget');
  const makeTemplate = (data:QiitaWidgetParam):string => {
    return `
<style>${CSS}</style>
<section>
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
<script>!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("axios")):"function"==typeof define&&define.amd?define("QiitaWidget",["axios"],e):"object"==typeof exports?exports.QiitaWidget=e(require("axios")):t.QiitaWidget=e(t.axios)}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){n(1),t.exports=n(2)},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(5),o=n(6),a=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(i,o){function a(t){try{u(r.next(t))}catch(t){o(t)}}function s(t){try{u(r.throw(t))}catch(t){o(t)}}function u(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(a,s)}u((r=r.apply(t,e||[])).next())})},s=this&&this.__generator||function(t,e){function n(t){return function(e){return r([t,e])}}function r(n){if(i)throw new TypeError("Generator is already executing.");for(;u;)try{if(i=1,o&&(a=o[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(o,n[1])).done)return a;switch(o=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,o=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(a=u.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){u.label=n[1];break}if(6===n[0]&&u.label<a[1]){u.label=a[1],a=n;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(n);break}a[2]&&u.ops.pop(),u.trys.pop();continue}n=e.call(t,u)}catch(t){n=[6,t],o=0}finally{i=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,o,a,s,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},u=function(){function t(e){this.conf=Object.assign({},t.defaultConf,e),this.endpoint="https://qiita.com/api/v2/users/"+this.conf.userId+"/items",this.apiConfCreator=new i.a(this.endpoint,this.conf),this.dataList=[],this.presenter=new r.a(this.conf)}return t.prototype.init=function(){return a(this,void 0,void 0,function(){return s(this,function(t){switch(t.label){case 0:return[4,this.fetchList()];case 1:return t.sent(),this.parseDataList(),this.render(),[2]}})})},t.prototype.render=function(){this.presenter.renderUser(),this.presenter.renderArticles()},t.prototype.fetchList=function(){return a(this,void 0,void 0,function(){var t;return s(this,function(e){switch(e.label){case 0:t=0,e.label=1;case 1:return t<this.conf.maxRequest?[4,this.fetchOnce()]:[3,3];case 2:return e.sent()?(t++,[3,1]):[3,3];case 3:return[2]}})})},t.prototype.fetchOnce=function(){return a(this,void 0,void 0,function(){var t;return s(this,function(e){switch(e.label){case 0:return[4,o.a.get(this.apiConfCreator.getNextConf())];case 1:return t=e.sent(),0===t.data.length?[2,!1]:t.data.length<this.conf.perPage?(this.dataList=this.dataList.concat(t),[2,!1]):(this.dataList=this.dataList.concat(t),[2,!0])}})})},t.prototype.parseDataList=function(){this.presenter.articles=this.dataList.reduce(function(t,e){return t.concat(e.data)},[]),this.presenter.user=Object.assign({},this.dataList[0].data[0].user),this.presenter.user.likes_count=this.presenter.countAllLikes(),this.presenter.user.url="https://qiita.com/"+this.presenter.user.id},t.defaultConf={userId:"qiita",perPage:20,expirationDay:1,maxRequest:10},t}();e.default=u},function(t,e,n){"use strict";n.d(e,"a",function(){return i});var r=n(4),i=function(){function t(e){this.articles=[],this.user=null,this.conf=Object.assign({},t.defaultConf,e),this.userTemplate=document.querySelector(this.conf.userTemplate),this.userDest=document.querySelector(this.conf.userDest),this.articleTemplate=document.querySelector(this.conf.articleTemplate),this.articleDest=document.querySelector(this.conf.articleDest)}return t.prototype.countAllLikes=function(){return this.articles.reduce(function(t,e){return t+e.likes_count},0)},t.prototype.renderUser=function(){var t=this,e=function(e){var n=document.importNode(e.content,!0);return Object.entries(t.user).forEach(function(e){t.fillTemplate(n,e)}),n};this.renderView(this.userTemplate,this.userDest,e)},t.prototype.renderArticles=function(){var t=this,e=function(e){var n=t.createArticleOrderList(t.articles),r=t.createTargetArticleList(t.articles,n);return t.genArticleFragment(e,r)};this.renderView(this.articleTemplate,this.articleDest,e)},t.prototype.genArticleFragment=function(t,e){var n=this,r=document.createDocumentFragment();return e.forEach(function(e){e.private||r.appendChild(n.createArticleFragment(t,e))}),r},t.prototype.createTargetArticleList=function(t,e){var n=this.conf.sortByLike&&!this.conf.useShuffle?r.c(t,"likes_count"):t;return n=e.map(function(e){return t[e]}),this.conf.sortByLike&&this.conf.useShuffle?r.c(n,"likes_count"):n},t.prototype.createArticleOrderList=function(t){var e=function(){return Array(t.length).fill(0).map(function(t,e){return e})};return(this.conf.useShuffle?r.b(e()):e()).slice(0,this.conf.max)},t.prototype.renderView=function(t,e,n){if(null===t)throw new Error("Could not find template! conf "+JSON.stringify(this.conf));if(null===e)throw new Error("Could not find dest! conf "+JSON.stringify(this.conf));var r=n(t);e.appendChild(r)},t.prototype.createArticleFragment=function(t,e){var n=this,r=document.importNode(t.content,!0);return Object.entries(e).forEach(function(t){return n.fillTemplate(r,t)}),r},t.prototype.fillTemplate=function(t,e){var n=e[0],r=e[1],i=".js-"+n.replace(/_/g,"-"),o=t.querySelector(i);null!==o&&null!==r&&this.fillContent(n,r,o)},t.prototype.fillContent=function(t,e,n){if(void 0!==e){var i="number"==typeof e?r.a(e):e;if(null!==e)switch(t){case"url":case"website_url":n.setAttribute("href",i);break;case"profile_image_url":n.setAttribute("src",i);break;case"tags":i.forEach(function(t){var e=document.createElement("li");e.innerText=t.name,n.appendChild(e)});break;default:n.textContent=i}}},t.defaultConf={useShuffle:!1,sortByLike:!0,userDest:"#qiita-user",userTemplate:"#qiita-user-tpl",articleDest:"#qiita-article",articleTemplate:"#qiita-article-tpl",max:10},t}()},function(t,e,n){"use strict";function r(t){return Number.isNaN(t)?null:t+""}function i(t){for(var e=t.concat(),n=e.length;n;){var r=Math.floor(Math.random()*n--),i=e[n];e[n]=e[r],e[r]=i}return e}function o(t,e){return t.sort(function(t,n){if(void 0===t[e])return 0;if(void 0===n[e])return 0;var r=parseInt(t[e],10),i=parseInt(n[e],10);return Number.isNaN(r)||Number.isNaN(i)?0:r<i?1:r>i?-1:0})}e.a=r,e.b=i,e.c=o},function(t,e,n){"use strict";n.d(e,"a",function(){return r});var r=function(){function t(t,e){this.conf={id:t+"?page=0",endpoint:t,expirationDay:e.expirationDay,axiosRequestConfig:{params:{page:0,per_page:e.perPage}}}}return t.prototype.getNextConf=function(){return this.conf=this.countUp(this.conf),this.conf},t.prototype.countUp=function(t){var e=t.axiosRequestConfig.params.page,n=e+1;return Object.assign({},t,{id:t.endpoint+"?page="+n,axiosRequestConfig:{params:{page:n}}})},t}()},function(t,e,n){"use strict";n.d(e,"a",function(){return u});var r=n(7),i=n.n(r),o=n(8),a=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(i,o){function a(t){try{u(r.next(t))}catch(t){o(t)}}function s(t){try{u(r.throw(t))}catch(t){o(t)}}function u(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(a,s)}u((r=r.apply(t,e||[])).next())})},s=this&&this.__generator||function(t,e){function n(t){return function(e){return r([t,e])}}function r(n){if(i)throw new TypeError("Generator is already executing.");for(;u;)try{if(i=1,o&&(a=o[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(o,n[1])).done)return a;switch(o=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,o=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(a=u.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){u.label=n[1];break}if(6===n[0]&&u.label<a[1]){u.label=a[1],a=n;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(n);break}a[2]&&u.ops.pop(),u.trys.pop();continue}n=e.call(t,u)}catch(t){n=[6,t],o=0}finally{i=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,o,a,s,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},u=function(){function t(){}return t.get=function(e,n){return void 0===n&&(n=new o.a(e.id)),a(this,void 0,void 0,function(){var r,i;return s(this,function(o){return 0===e.expirationDay?[2,t.fetch(e,n)]:(r=n.getCache())?(i=n.validateDate(e.expirationDay),i?[2,n]:[2,t.fetch(e,n)]):[2,t.fetch(e,n)]})})},t.fetch=function(t,e){return void 0===e&&(e=new o.a(t.id)),a(this,void 0,void 0,function(){var n;return s(this,function(r){switch(r.label){case 0:return[4,i.a.get(t.endpoint,t.axiosRequestConfig)];case 1:return n=r.sent(),e.data=n.data,e.setTimestamp(new Date),e.saveCache(),[2,e]}})})},t}()},function(e,n){e.exports=t},function(t,e,n){"use strict";var r=function(){function t(t){this.id=t,this.data=null,this.timestamp=null}return t.prototype.validateDate=function(t){if(null===this.timestamp||0===t)return!1;if(null===this.data)return!1;var e=+this.timestamp-+new Date;if(Number.isNaN(e))throw new Error("unexpected NaN value!");return e/864e5<=t},t.prototype.getCache=function(){var t=localStorage.getItem(this.id);if(null===t)return!1;var e=JSON.parse(t);return this.data=e.data,this.timestamp=new Date(e.timestamp),!0},t.prototype.saveCache=function(){return null!==this.data&&(localStorage.setItem(this.id,JSON.stringify({data:this.data,timestamp:this.timestamp})),!0)},t.prototype.setTimestamp=function(t){this.timestamp=t},t}();e.a=r}]).default});</script>
<script>
  (function() {
    var widget = new QiitaWidget({
      userId: '${data.userId}',
      ${data.useShuffle ? `useShuffle: ${data.useShuffle},` : ''}
      ${data.sortByLike ? `sortByLike: ${data.sortByLike},` : ''}
      ${data.expirationDay ? `expirationDay: ${data.expirationDay},` : ''}
      ${data.perPage ? `perPage: ${data.perPage},` : ''}
      ${data.max ? `max: ${data.max},` : ''}
    });
    widget.init();
  })();
</script>
  `;};

  Array.from(dests, (item:HTMLElement) => {
    item.style.display = 'none';

    const iframe = document.createElement('iframe');
    iframe.scrolling = 'no';
    iframe.frameBorder = '0';
    iframe.marginWidth = '0';
    iframe.marginHeight = '0';
    iframe.width = '100%';
    iframe.height = 'auto';
    iframe.classList.add('qiita-widget-iframe');

    item.parentNode.insertBefore(iframe, item);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(makeTemplate({
      userId: item.dataset.userId,
      useShuffle: !!item.dataset.useShuffle,
      perPage: parseInt(item.dataset.perPage, 10),
      expirationDay: parseInt(item.dataset.expirationDay, 10),
      max: parseInt(item.dataset.max, 10)
    }));
    doc.close();

    // Start auto height set if it is necessary
    if(iframe.height !== 'auto') {
      return;
    }

    const setHeight = () => {
      iframe.height = doc.documentElement.scrollHeight.toString();
    };

    const updateHeight = () => {
      setHeight();
      iframe.removeEventListener('load', updateHeight);
    };

    iframe.addEventListener('load', updateHeight);

  });

})();
