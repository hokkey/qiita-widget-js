/*! For license information please see iframe.js.LICENSE.txt */
(()=>{var t={741:t=>{"use strict";t.exports='/*! For license information please see lib.bundled.js.LICENSE.txt */\n!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("QiitaWidget",[],e):"object"==typeof exports?exports.QiitaWidget=e():t.QiitaWidget=e()}(self,(function(){return(()=>{var t={556:function(t,e){var n,r;void 0===(r="function"==typeof(n=function(){var t,e,n="lscache-",r="-cacheexpiration",o=6e4,i=w(o),a="",c=!1;function u(){var e="__lscachetest__";if(void 0!==t)return t;try{if(!localStorage)return!1}catch(t){return!1}try{d(e,"__lscachetest__"),y(e),t=!0}catch(e){t=!(!s(e)||!localStorage.length)}return t}function s(t){return t&&("QUOTA_EXCEEDED_ERR"===t.name||"NS_ERROR_DOM_QUOTA_REACHED"===t.name||"QuotaExceededError"===t.name)}function l(){return void 0===e&&(e=null!=window.JSON),e}function f(t){return t+r}function h(){return Math.floor((new Date).getTime()/o)}function p(t){return localStorage.getItem(n+a+t)}function d(t,e){localStorage.removeItem(n+a+t),localStorage.setItem(n+a+t,e)}function y(t){localStorage.removeItem(n+a+t)}function m(t){for(var e=new RegExp("^lscache-"+(a.replace(/[[\\]{}()*+?.\\\\^$|]/g,"\\\\$&")+"(.*)")),n=localStorage.length-1;n>=0;--n){var o=localStorage.key(n);(o=(o=o&&o.match(e))&&o[1])&&o.indexOf(r)<0&&t(o,f(o))}}function v(t){var e=f(t);y(t),y(e)}function b(t){var e=f(t),n=p(e);if(n){var r=parseInt(n,10);if(h()>=r)return y(t),y(e),!0}}function g(t,e){c&&"console"in window&&"function"==typeof window.console.warn&&(window.console.warn("lscache - "+t),e&&window.console.warn("lscache - The error was: "+e.message))}function w(t){return Math.floor(864e13/t)}return{set:function(t,e,n){if(!u())return!1;if(!l())return!1;try{e=JSON.stringify(e)}catch(t){return!1}try{d(t,e)}catch(n){if(!s(n))return g("Could not add item with key \'"+t+"\'",n),!1;var r,o=[];m((function(t,e){var n=p(e);n=n?parseInt(n,10):i,o.push({key:t,size:(p(t)||"").length,expiration:n})})),o.sort((function(t,e){return e.expiration-t.expiration}));for(var a=(e||"").length;o.length&&a>0;)r=o.pop(),g("Cache is full, removing item with key \'"+t+"\'"),v(r.key),a-=r.size;try{d(t,e)}catch(e){return g("Could not add item with key \'"+t+"\', perhaps it\'s too big?",e),!1}}return n?d(f(t),(h()+n).toString(10)):y(f(t)),!0},get:function(t){if(!u())return null;if(b(t))return null;var e=p(t);if(!e||!l())return e;try{return JSON.parse(e)}catch(t){return e}},remove:function(t){u()&&v(t)},supported:function(){return u()},flush:function(){u()&&m((function(t){v(t)}))},flushExpired:function(){u()&&m((function(t){b(t)}))},setBucket:function(t){a=t},resetBucket:function(){a=""},getExpiryMilliseconds:function(){return o},setExpiryMilliseconds:function(t){i=w(o=t)},enableWarnings:function(t){c=t}}})?n.apply(e,[]):n)||(t.exports=r)},162:(t,e,n)=>{"use strict";function r(t,e){return t.sort((function(t,n){var r=[t[e],n[e]].map((function(t){return"string"==typeof t?parseInt(t,10):"number"==typeof t?t:NaN})),o=r[0],i=r[1];return Number.isNaN(o)||Number.isNaN(i)?0:o<i?1:o>i?-1:0}))}function o(t){return Array(t).fill(0).map((function(t,e){return e}))}n.d(e,{default:()=>f});var i=n(556),a=function(){function t(){if("undefined"==typeof fetch)throw new Error("This browser does not have Fetch API.")}return t.prototype.fetch=function(t){return e=this,n=void 0,o=function(){var e,n,r,o;return function(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}(this,(function(i){switch(i.label){case 0:return e=new URL(t.url),Object.keys(t.params).forEach((function(n){var r=t.params[n];"string"==typeof r&&e.searchParams.append(n,r),"number"==typeof r&&e.searchParams.append(n,""+r)})),null!=(n=this.getCache(e.toString()))?[2,Promise.resolve(n)]:[4,fetch(e.toString())];case 1:return 200!==(r=i.sent()).status?[2,Promise.reject(new Error(""+r.status))]:[4,r.json()];case 2:return o=i.sent(),this.saveCache(e.toString(),o,t.cacheAgeMin),[2,o]}}))},new((r=void 0)||(r=Promise))((function(t,i){function a(t){try{u(o.next(t))}catch(t){i(t)}}function c(t){try{u(o.throw(t))}catch(t){i(t)}}function u(e){var n;e.done?t(e.value):(n=e.value,n instanceof r?n:new r((function(t){t(n)}))).then(a,c)}u((o=o.apply(e,n||[])).next())}));var e,n,r,o},t.prototype.getCache=function(t){return i.get(t)},t.prototype.saveCache=function(t,e,n){i.set(t,e,n)},t}(),c=function(){function t(e){var n=t.validateConf(Object.assign({},t.defaultConf,e));this.requestConf={maxRequest:n.maxRequest,cacheAgeMin:n.cacheAgeMin,url:"https://qiita.com/api/v2/users/"+n.userId+"/items",params:{per_page:n.perPage,page:0}},this.api=new a}return t.validateConf=function(t){return t.perPage<=0&&(t.perPage=1),t.perPage>100&&(t.perPage=100),t.maxRequest<0&&(t.maxRequest=0),t},t.prototype.fetch=function(){return t=this,e=void 0,r=function(){var t,e,n,r;return function(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}(this,(function(o){switch(o.label){case 0:t=0,e=[],o.label=1;case 1:return t<this.requestConf.maxRequest?(t++,this.createNextRequest(),[4,this.fetchItems()]):[3,3];case 2:return n=o.sent(),r=this.isThereNextPage(n),e=e.concat(n),r?[3,1]:[3,3];case 3:return[2,e]}}))},new((n=void 0)||(n=Promise))((function(o,i){function a(t){try{u(r.next(t))}catch(t){i(t)}}function c(t){try{u(r.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}u((r=r.apply(t,e||[])).next())}));var t,e,n,r},t.prototype.fetchItems=function(){return this.api.fetch(this.requestConf)},t.prototype.createNextRequest=function(){this.requestConf.params.page+=1},t.prototype.isThereNextPage=function(t){return 0!==t.length&&!(t.length<this.requestConf.params.per_page)},t.defaultConf={userId:"qiita",maxRequest:5,perPage:100,cacheAgeMin:15},t}(),u=function(){return(u=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},s=function(){function t(e){this.conf=t.validateConf(Object.assign({},t.defaultConf,e)),this.api=new c(this.conf),this.articles=[]}return t.validateConf=function(t){return t.maxToShow<0&&(t.maxToShow=0),t.filterByLikesFrom<0&&(t.filterByLikesFrom=0),t},t.prototype.fetch=function(){return t=this,e=void 0,r=function(){var t;return function(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}(this,(function(e){switch(e.label){case 0:return t=this,[4,this.api.fetch()];case 1:return t.articles=e.sent(),[2]}}))},new((n=void 0)||(n=Promise))((function(o,i){function a(t){try{u(r.next(t))}catch(t){i(t)}}function c(t){try{u(r.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}u((r=r.apply(t,e||[])).next())}));var t,e,n,r},t.prototype.createOrder=function(t){return(this.conf.useShuffle?function(t){for(var e=t.concat(),n=e.length;n;){var r=Math.floor(Math.random()*n--),o=e[n];e[n]=e[r],e[r]=o}return e}(o(t.length)):o(t.length)).slice(0,this.conf.maxToShow)},t.prototype.filterOrigin=function(){var t=this;return 0===this.conf.filterByLikesFrom?this.articles:this.articles.filter((function(e){return e.likes_count>=t.conf.filterByLikesFrom}))},t.prototype.getArticlesToShow=function(){var t=this.filterOrigin(),e=this.conf.sortByLike&&!this.conf.useShuffle?r(t,"likes_count"):t,n=this.createOrder(t).map((function(t){return e[t]}));return this.conf.sortByLike&&this.conf.useShuffle?r(n,"likes_count"):n},t.prototype.getUserToShow=function(){var t=this.articles[0].user;return u(u({},t),{likes_count:this.countAllLikes(),url:"https://qiita.com/"+t.id})},t.prototype.countAllLikes=function(){return this.articles.reduce((function(t,e){return t+e.likes_count}),0)},t.defaultConf={maxToShow:5,useShuffle:!1,sortByLike:!0,filterByLikesFrom:0},t}(),l=function(){function t(e,n,r){this.dest=e,this.items=n,this.conf=Object.assign({},t.defaultConf,r);var o=document.querySelector(this.conf.userTemplate),i=document.querySelector(this.conf.articleTemplate);this.userTemplate=o instanceof HTMLTemplateElement?o:null,this.articleTemplate=i instanceof HTMLTemplateElement?i:null;var a=null===e?document.querySelector(this.conf.userDest):e.querySelector(this.conf.userDest),c=null===e?document.querySelector(this.conf.articleDest):e.querySelector(this.conf.articleDest);this.userDest=a instanceof HTMLElement?a:null,this.articleDest=c instanceof HTMLElement?c:null}return t.prototype.render=function(){this.claimNoTransition(),this.renderUser(),this.renderArticles(),this.setSubject(),this.claimLoaded()},t.prototype.setSubject=function(){var t=this;if(null!==this.dest){var e=this.dest.querySelectorAll(".js-subject");Array.from(e,(function(e){e.innerText=t.conf.subject}))}},t.prototype.renderUser=function(){var t=this;null!==this.userTemplate&&null!==this.userDest&&this.renderView(this.userTemplate,this.userDest,(function(e){var n=document.importNode(e.content,!0);return Object.entries(t.items.getUserToShow()).forEach((function(e){t.fillTemplate(n,e)})),n}))},t.prototype.renderArticles=function(){var t=this;null!==this.articleTemplate&&null!==this.articleDest&&this.renderView(this.articleTemplate,this.articleDest,(function(e){var n=document.createDocumentFragment();return t.items.getArticlesToShow().forEach((function(r){n.appendChild(t.createArticleFragment(e,r))})),n}))},t.prototype.createArticleFragment=function(t,e){var n=this,r=document.importNode(t.content,!0);return Object.entries(e).forEach((function(t){return n.fillTemplate(r,t)})),r},t.prototype.renderView=function(t,e,n){var r=n(t);e.appendChild(r)},t.prototype.fillTemplate=function(t,e){var n=e[0],r=e[1],o=".js-"+n.replace(/_/g,"-"),i=t.querySelector(o);null!==i&&this.fillContent(n,r,i)},t.prototype.fillContent=function(t,e,n){if(Array.isArray(e))this.fillTags(e,n);else{var r,o="string"==typeof e?e:"number"==typeof e?(r=e,Number.isNaN(r)?"":""+r):"";switch(t){case"url":case"website_url":n.setAttribute("href",o);break;case"profile_image_url":n.setAttribute("src",o);break;default:n.textContent=o}}},t.prototype.fillTags=function(t,e){t.forEach((function(t){var n=document.createElement("li");n.innerText=t.name,e.appendChild(n)}))},t.prototype.claimNoTransition=function(){null!==this.dest&&(this.conf.useTransition||this.dest.classList.add("is-no-transition"))},t.prototype.claimLoaded=function(){null!==this.dest&&this.conf.useTransition&&this.dest.classList.add("is-qiita-widget-loaded")},t.defaultConf={subject:"人気の投稿",userDest:".js-qiita-user",userTemplate:"#qiita-user-tpl",articleDest:".js-qiita-article",articleTemplate:"#qiita-article-tpl",useTransition:!0},t}();const f=function(){function t(e,n){this.conf=Object.assign({},t.defaultConf,n),this.items=new s(this.conf),this.presenter=new l(e,this.items,this.conf)}return t.prototype.init=function(){return t=this,e=void 0,r=function(){return function(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}(this,(function(t){switch(t.label){case 0:return[4,this.items.fetch()];case 1:return t.sent(),this.presenter.render(),[2]}}))},new((n=void 0)||(n=Promise))((function(o,i){function a(t){try{u(r.next(t))}catch(t){i(t)}}function c(t){try{u(r.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}u((r=r.apply(t,e||[])).next())}));var t,e,n,r},t.defaultConf={},t}()}},e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={exports:{}};return t[r].call(o.exports,o,o.exports,n),o.exports}return n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n(162)})().default}));'},560:(t,i,e)=>{var n=e(645)((function(t){return t[1]}));n.push([t.id,"/*! sanitize.css | CC0 Public Domain | github.com/jonathantneal/sanitize.css */:root{-ms-overflow-style:-ms-autohiding-scrollbar;overflow-y:scroll;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;text-size-adjust:100%}*,::before,::after{box-sizing:inherit}*{font-size:inherit;line-height:inherit}::before,::after{text-decoration:inherit;vertical-align:inherit}*,::before,::after{border-style:solid;border-width:0}*{margin:0;padding:0}:root{box-sizing:border-box;cursor:default;font:16px / 1.5 sans-serif;text-rendering:optimizeLegibility}html{background-color:#fff}a{text-decoration:none}template{display:none}.qiita-widget{line-height:1.1;font-family:-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Hiragino Kaku Gothic ProN, 'メイリオ', meiryo, sans-serif}.qiita-widget a:link,.qiita-widget a:visited{color:#337ab7}.qiita-widget a:hover{text-decoration:underline}.qiita-widget img{width:100%;height:auto}.qiita-widget__articles-head{font-size:14px;font-weight:700;margin-bottom:10px}.qiita-widget__articles{margin-top:15px}.qiita-user{display:flex;flex-flow:row nowrap}.qiita-user__image{width:60px;height:60px;margin-right:5px}.qiita-user__url:hover>*{text-decoration:underline}.qiita-user__id{font-size:16px;margin-bottom:3px}.qiita-user__likes-num,.qiita-user__followers-num,.qiita-user__items-num{font-weight:700;font-size:14px}.qiita-user__likes-unit,.qiita-user__followers-unit,.qiita-user__items-unit{font-size:12px}.qiita-article-list{list-style:none;padding-left:10px;margin-left:-10px}.qiita-article{padding-left:10px}.qiita-article__title{font-size:13px;line-height:1.42857;margin-bottom:5px;font-weight:normal}.qiita-article__title:before{display:inline-block;content:'\\2022';color:#999;margin-left:-10px;margin-right:5px}.transition{display:block;overflow:hidden}.transition__inner{display:inline-block;transform:translateY(-125%);will-change:transform}.is-qiita-widget-loaded .transition--s0 .transition__inner{-webkit-animation:transition 1s ease;animation:transition 1s ease;-webkit-animation-delay:0s;animation-delay:0s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.is-qiita-widget-loaded .transition--s0:nth-of-type(1) .transition__inner{-webkit-animation-delay:.13s;animation-delay:.13s}.is-qiita-widget-loaded .transition--s0:nth-of-type(2) .transition__inner{-webkit-animation-delay:.26s;animation-delay:.26s}.is-qiita-widget-loaded .transition--s1 .transition__inner{-webkit-animation:transition 1s ease;animation:transition 1s ease;-webkit-animation-delay:.2s;animation-delay:.2s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.is-qiita-widget-loaded .transition--s1:nth-of-type(1) .transition__inner{-webkit-animation-delay:.33s;animation-delay:.33s}.is-qiita-widget-loaded .transition--s1:nth-of-type(2) .transition__inner{-webkit-animation-delay:.46s;animation-delay:.46s}.is-qiita-widget-loaded .transition--s2 .transition__inner{-webkit-animation:transition 1s ease;animation:transition 1s ease;-webkit-animation-delay:.4s;animation-delay:.4s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.is-qiita-widget-loaded .transition--s2:nth-of-type(1) .transition__inner{-webkit-animation-delay:.53s;animation-delay:.53s}.is-qiita-widget-loaded .transition--s2:nth-of-type(2) .transition__inner{-webkit-animation-delay:.66s;animation-delay:.66s}.is-qiita-widget-loaded .transition--s3 .transition__inner{-webkit-animation:transition 1s ease;animation:transition 1s ease;-webkit-animation-delay:.6s;animation-delay:.6s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.is-qiita-widget-loaded .transition--s3:nth-of-type(1) .transition__inner{-webkit-animation-delay:.73s;animation-delay:.73s}.is-qiita-widget-loaded .transition--s3:nth-of-type(2) .transition__inner{-webkit-animation-delay:.86s;animation-delay:.86s}.is-qiita-widget-loaded .transition--s4 .transition__inner{-webkit-animation:transition 1s ease;animation:transition 1s ease;-webkit-animation-delay:.8s;animation-delay:.8s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.is-qiita-widget-loaded .transition--s4:nth-of-type(1) .transition__inner{-webkit-animation-delay:.93s;animation-delay:.93s}.is-qiita-widget-loaded .transition--s4:nth-of-type(2) .transition__inner{-webkit-animation-delay:1.06s;animation-delay:1.06s}.is-qiita-widget-loaded .transition--s5 .transition__inner{-webkit-animation:transition 1s ease;animation:transition 1s ease;-webkit-animation-delay:1s;animation-delay:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.is-qiita-widget-loaded .transition--s5:nth-of-type(1) .transition__inner{-webkit-animation-delay:1.13s;animation-delay:1.13s}.is-qiita-widget-loaded .transition--s5:nth-of-type(2) .transition__inner{-webkit-animation-delay:1.26s;animation-delay:1.26s}.is-qiita-widget-loaded .transition--s5:nth-of-type(3) .transition__inner{-webkit-animation-delay:1.39s;animation-delay:1.39s}.is-qiita-widget-loaded .transition--s5:nth-of-type(4) .transition__inner{-webkit-animation-delay:1.52s;animation-delay:1.52s}.is-qiita-widget-loaded .transition--s5:nth-of-type(5) .transition__inner{-webkit-animation-delay:1.65s;animation-delay:1.65s}.is-qiita-widget-loaded .transition--s5:nth-of-type(6) .transition__inner{-webkit-animation-delay:1.78s;animation-delay:1.78s}.is-qiita-widget-loaded .transition--s5:nth-of-type(7) .transition__inner{-webkit-animation-delay:1.91s;animation-delay:1.91s}.is-qiita-widget-loaded .transition--s5:nth-of-type(8) .transition__inner{-webkit-animation-delay:2.04s;animation-delay:2.04s}.is-qiita-widget-loaded .transition--s5:nth-of-type(9) .transition__inner{-webkit-animation-delay:2.17s;animation-delay:2.17s}.is-qiita-widget-loaded .transition--s5:nth-of-type(10) .transition__inner{-webkit-animation-delay:2.3s;animation-delay:2.3s}.is-qiita-widget-loaded .transition--s5:nth-of-type(11) .transition__inner{-webkit-animation-delay:2.43s;animation-delay:2.43s}.is-qiita-widget-loaded .transition--s5:nth-of-type(12) .transition__inner{-webkit-animation-delay:2.56s;animation-delay:2.56s}.is-qiita-widget-loaded .transition--s5:nth-of-type(13) .transition__inner{-webkit-animation-delay:2.69s;animation-delay:2.69s}.is-qiita-widget-loaded .transition--s5:nth-of-type(14) .transition__inner{-webkit-animation-delay:2.82s;animation-delay:2.82s}.is-qiita-widget-loaded .transition--s5:nth-of-type(15) .transition__inner{-webkit-animation-delay:2.95s;animation-delay:2.95s}.is-qiita-widget-loaded .transition--s5:nth-of-type(16) .transition__inner{-webkit-animation-delay:3.08s;animation-delay:3.08s}.is-qiita-widget-loaded .transition--s5:nth-of-type(17) .transition__inner{-webkit-animation-delay:3.21s;animation-delay:3.21s}.is-qiita-widget-loaded .transition--s5:nth-of-type(18) .transition__inner{-webkit-animation-delay:3.34s;animation-delay:3.34s}.is-qiita-widget-loaded .transition--s5:nth-of-type(19) .transition__inner{-webkit-animation-delay:3.47s;animation-delay:3.47s}.is-qiita-widget-loaded .transition--s5:nth-of-type(20) .transition__inner{-webkit-animation-delay:3.6s;animation-delay:3.6s}.is-qiita-widget-loaded .transition--s5:nth-of-type(21) .transition__inner{-webkit-animation-delay:3.73s;animation-delay:3.73s}.is-qiita-widget-loaded .transition--s5:nth-of-type(22) .transition__inner{-webkit-animation-delay:3.86s;animation-delay:3.86s}.is-qiita-widget-loaded .transition--s5:nth-of-type(23) .transition__inner{-webkit-animation-delay:3.99s;animation-delay:3.99s}.is-qiita-widget-loaded .transition--s5:nth-of-type(24) .transition__inner{-webkit-animation-delay:4.12s;animation-delay:4.12s}.is-qiita-widget-loaded .transition--s5:nth-of-type(25) .transition__inner{-webkit-animation-delay:4.25s;animation-delay:4.25s}.is-qiita-widget-loaded .transition--s5:nth-of-type(26) .transition__inner{-webkit-animation-delay:4.38s;animation-delay:4.38s}.is-qiita-widget-loaded .transition--s5:nth-of-type(27) .transition__inner{-webkit-animation-delay:4.51s;animation-delay:4.51s}.is-qiita-widget-loaded .transition--s5:nth-of-type(28) .transition__inner{-webkit-animation-delay:4.64s;animation-delay:4.64s}.is-qiita-widget-loaded .transition--s5:nth-of-type(29) .transition__inner{-webkit-animation-delay:4.77s;animation-delay:4.77s}@-webkit-keyframes transition{from{transform:translateY(-125%)}to{transform:translateY(0)}}@keyframes transition{from{transform:translateY(-125%)}to{transform:translateY(0)}}.is-no-transition .transition__inner{transform:none;will-change:none}.loader,.loader:before,.loader:after{border-radius:50%}.loader{color:#acdd86;margin:55px auto;position:relative;width:10em;height:10em;box-shadow:inset 0 0 0 1em;transform:translateZ(0);transition:opacity 0.3s ease;opacity:0}.is-iframe-loading .loader{opacity:1}.loader:before,.loader:after{position:absolute;content:''}.loader:before{width:5.2em;height:10.2em;background:white;border-radius:10.2em 0 0 10.2em;top:-0.1em;left:-0.1em;transform-origin:5.2em 5.1em;-webkit-animation:load2 2s infinite ease 1.5s;animation:load2 2s infinite ease 1.5s}.loader:after{width:5.2em;height:10.2em;background:white;border-radius:0 10.2em 10.2em 0;top:-0.1em;left:5.1em;transform-origin:0 5.1em;-webkit-animation:load2 2s infinite ease;animation:load2 2s infinite ease}@-webkit-keyframes load2{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes load2{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@-webkit-keyframes disappear{from{display:block;opacity:1;transform:scale(1)}99%{opacity:0;transform:scale(1)}to{display:none;transform:scale(0)}}@keyframes disappear{from{display:block;opacity:1;transform:scale(1)}99%{opacity:0;transform:scale(1)}to{display:none;transform:scale(0)}}.shield{display:block;position:absolute;top:0;left:0;right:0;bottom:0;border-radius:8px;-webkit-animation:disappear 0.3s 0.3s ease;animation:disappear 0.3s 0.3s ease;-webkit-animation-fill-mode:both;animation-fill-mode:both;opacity:0}.shield .loader{transform:scale(0.35, 0.35)}.is-iframe-loading .shield{-webkit-animation:none;animation:none;opacity:1}body{position:relative;overflow:hidden;background-color:#fff}\n",""]),t.exports=n},645:t=>{"use strict";t.exports=function(t){var i=[];return i.toString=function(){return this.map((function(i){var e=t(i);return i[2]?"@media ".concat(i[2]," {").concat(e,"}"):e})).join("")},i.i=function(t,e,n){"string"==typeof t&&(t=[[null,t,""]]);var a={};if(n)for(var o=0;o<this.length;o++){var r=this[o][0];null!=r&&(a[r]=!0)}for(var s=0;s<t.length;s++){var l=[].concat(t[s]);n&&a[l[0]]||(e&&(l[2]?l[2]="".concat(e," and ").concat(l[2]):l[2]=e),i.push(l))}},i}},719:t=>{t.exports='<section class="qiita-widget js-qiita-widget"> <header class="qiita-widget__header qiita-user js-qiita-user"></header> <section class="qiita-widget__articles"> <h2 class="qiita-widget__articles-head transition transition--s4"> <span class="transition__inner js-subject"></span> </h2> <ul class="qiita-article-list js-qiita-article"></ul> </section> </section> <div class="shield"> <div class="loader"></div> </div> <template id="qiita-user-tpl"> <p class="qiita-user__image transition transition--s1"> <img class="qiita-user__img js-profile-image-url transition__inner" alt=""/> </p> <div class="qiita-user__title"> <a class="qiita-user__url js-url transition transition--s2" target="_blank"><h1 class="qiita-user__id js-id transition__inner"></h1></a> <p class="qiita-user__items transition transition--s3"> <span class="qiita-user__items-num js-items-count transition__inner"></span> <span class="qiita-user__items-unit transition__inner">Items</span> </p> <p class="qiita-user__likes transition transition--s3"> <span class="qiita-user__likes-num js-likes-count transition__inner"></span> <span class="qiita-user__likes-unit transition__inner">Contribution</span> </p> </div> </template> <template id="qiita-article-tpl"> <li class="qiita-article-list__item transition transition--s5"> <a class="qiita-article js-url transition transition__inner" target="_blank"> <h3 class="qiita-article__title js-title"></h3> </a> </li> </template> '}},i={};function e(n){if(i[n])return i[n].exports;var a=i[n]={id:n,exports:{}};return t[n](a,a.exports,e),a.exports}e.n=t=>{var i=t&&t.__esModule?()=>t.default:()=>t;return e.d(i,{a:i}),i},e.d=(t,i)=>{for(var n in i)e.o(i,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:i[n]})},e.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),(()=>{"use strict";var t,i=e(560),n=e.n(i),a=e(719),o=e.n(a),r=e(741);function s(t,i){var e=function(t,i){var e=document.createElement("iframe");t.appendChild(e);var a=e.contentDocument;if(null==a)return null;var s,l,c=function(t,i){return"\n<style>"+n()+'</style>\n<div id="widget">'+o()+"</div>\n<script>\n  "+r+"\n  (function() {\n    new QiitaWidget(document.getElementById('widget'), "+JSON.stringify(t)+").init().then(() => {\n      document.body.classList.remove('is-iframe-loading');\n\n      var body = document.body;\n      var html = document.documentElement;\n      var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);\n\n      parent.window.postMessage({\n        id: "+i+",\n        height: height\n      }, location.href);\n    });\n  })();\n<\/script>"}((s=t,l={},["userId","subject"].forEach((function(t){var i=s.dataset[t];"string"==typeof i&&(l[t]=i)})),["sortByLike","useShuffle","useTransition"].forEach((function(t){var i=s.dataset[t];"string"==typeof i&&(l[t]="true"===i.toLowerCase())})),["perPage","maxToShow","maxRequest","cacheAgeMin","filterByLikesFrom"].forEach((function(t){var i=s.dataset[t];if("string"==typeof i){var e=parseInt(i,10);if(Number.isNaN(e))throw new Error(t+" was parsed as NaN!");l[t]=e}})),l),i);return a.open(),a.write(c),a.body.classList.add("is-iframe-loading"),a.close(),e}(t,i);null!=e&&(e.scrolling="auto",e.frameBorder="0",e.marginWidth="0",e.marginHeight="0",e.width="100%",e.height="220",e.classList.add("qiita-widget-iframe"),e.style.transition="height .35s ease",function(t,i){var e=i.dataset.height;"string"==typeof e&&"auto"!==e&&(t.height=e)}(e,t),function(t,i,e){var n=i.dataset.height;window.addEventListener("message",(function(i){"auto"===n&&i.data.id===e&&(t.height=i.data.height+"px")}),!1)}(e,t,i))}0!==(t=document.querySelectorAll(".js-qiita-widget")).length&&Array.from(t,(function(t,i){s(t,i)}))})()})();