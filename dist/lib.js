/*! qiita-widget-js | https://media-massage.net/qiita-widget-js | MIT License */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("axios"),require("lscache")):"function"==typeof define&&define.amd?define("QiitaWidget",["axios","lscache"],e):"object"==typeof exports?exports.QiitaWidget=e(require("axios"),require("lscache")):t.QiitaWidget=e(t.axios,t.lscache)}("undefined"!=typeof self?self:this,function(t,e){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,n){"use strict";function r(t){return Number.isNaN(t)?"":t+""}function i(t){for(var e=t.concat(),n=e.length;n;){var r=Math.floor(Math.random()*n--),i=e[n];e[n]=e[r],e[r]=i}return e}function o(t,e){return t.sort(function(t,n){if(void 0===t[e])return 0;if(void 0===n[e])return 0;var r=parseInt(t[e],10),i=parseInt(n[e],10);return Number.isNaN(r)||Number.isNaN(i)?0:r<i?1:r>i?-1:0})}function u(t){return Array(t).fill(0).map(function(t,e){return e})}e.b=r,e.c=i,e.d=o,e.a=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(7),o=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(i,o){function u(t){try{a(r.next(t))}catch(t){o(t)}}function s(t){try{a(r.throw(t))}catch(t){o(t)}}function a(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(u,s)}a((r=r.apply(t,e||[])).next())})},u=this&&this.__generator||function(t,e){function n(t){return function(e){return r([t,e])}}function r(n){if(i)throw new TypeError("Generator is already executing.");for(;a;)try{if(i=1,o&&(u=2&n[0]?o.return:n[0]?o.throw||((u=o.return)&&u.call(o),0):o.next)&&!(u=u.call(o,n[1])).done)return u;switch(o=0,u&&(n=[2&n[0],u.value]),n[0]){case 0:case 1:u=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,o=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(u=a.trys,!(u=u.length>0&&u[u.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!u||n[1]>u[0]&&n[1]<u[3])){a.label=n[1];break}if(6===n[0]&&a.label<u[1]){a.label=u[1],u=n;break}if(u&&a.label<u[2]){a.label=u[2],a.ops.push(n);break}u[2]&&a.ops.pop(),a.trys.pop();continue}n=e.call(t,a)}catch(t){n=[6,t],o=0}finally{i=u=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,o,u,s,a={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return s={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},s=function(){function t(e,n){this.conf=Object.assign({},t.defaultConf,n),this.items=new r.a(this.conf),this.presenter=new i.a(e,this.items,this.conf)}return t.prototype.init=function(){return o(this,void 0,void 0,function(){return u(this,function(t){switch(t.label){case 0:return[4,this.items.fetch()];case 1:return t.sent(),this.presenter.render(),[2]}})})},t.defaultConf={},t}();e.default=s},function(t,e,n){"use strict";n.d(e,"a",function(){return s});var r=n(0),i=n(3),o=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(i,o){function u(t){try{a(r.next(t))}catch(t){o(t)}}function s(t){try{a(r.throw(t))}catch(t){o(t)}}function a(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(u,s)}a((r=r.apply(t,e||[])).next())})},u=this&&this.__generator||function(t,e){function n(t){return function(e){return r([t,e])}}function r(n){if(i)throw new TypeError("Generator is already executing.");for(;a;)try{if(i=1,o&&(u=2&n[0]?o.return:n[0]?o.throw||((u=o.return)&&u.call(o),0):o.next)&&!(u=u.call(o,n[1])).done)return u;switch(o=0,u&&(n=[2&n[0],u.value]),n[0]){case 0:case 1:u=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,o=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(u=a.trys,!(u=u.length>0&&u[u.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!u||n[1]>u[0]&&n[1]<u[3])){a.label=n[1];break}if(6===n[0]&&a.label<u[1]){a.label=u[1],u=n;break}if(u&&a.label<u[2]){a.label=u[2],a.ops.push(n);break}u[2]&&a.ops.pop(),a.trys.pop();continue}n=e.call(t,a)}catch(t){n=[6,t],o=0}finally{i=u=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,o,u,s,a={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return s={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},s=function(){function t(e){this.conf=t.validateConf(Object.assign({},t.defaultConf,e)),this.api=new i.a(this.conf)}return t.validateConf=function(t){return t.maxToShow<0&&(t.maxToShow=0),t.filterByLikesFrom<0&&(t.filterByLikesFrom=0),t},t.prototype.fetch=function(){return o(this,void 0,void 0,function(){var t;return u(this,function(e){switch(e.label){case 0:return t=this,[4,this.api.fetch()];case 1:return t.articles=e.sent(),[2]}})})},t.prototype.createOrder=function(t){return(this.conf.useShuffle?r.c(r.a(t.length)):r.a(t.length)).slice(0,this.conf.maxToShow)},t.prototype.filterOrigin=function(){var t=this;return 0===this.conf.filterByLikesFrom?this.articles:this.articles.filter(function(e){return e.likes_count>=t.conf.filterByLikesFrom})},t.prototype.getArticlesToShow=function(){var t=this.filterOrigin(),e=this.conf.sortByLike&&!this.conf.useShuffle?r.d(t,"likes_count"):t,n=this.createOrder(t),i=n.map(function(t){return e[t]});return this.conf.sortByLike&&this.conf.useShuffle?r.d(i,"likes_count"):i},t.prototype.getUserToShow=function(){var t=Object.assign({},this.articles[0].user);return t.likes_count=this.countAllLikes(),t.url="https://qiita.com/"+t.id,t},t.prototype.countAllLikes=function(){return this.articles.reduce(function(t,e){return t+e.likes_count},0)},t.defaultConf={maxToShow:5,useShuffle:!1,sortByLike:!0,filterByLikesFrom:0},t}()},function(t,e,n){"use strict";n.d(e,"a",function(){return u});var r=n(4),i=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(i,o){function u(t){try{a(r.next(t))}catch(t){o(t)}}function s(t){try{a(r.throw(t))}catch(t){o(t)}}function a(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(u,s)}a((r=r.apply(t,e||[])).next())})},o=this&&this.__generator||function(t,e){function n(t){return function(e){return r([t,e])}}function r(n){if(i)throw new TypeError("Generator is already executing.");for(;a;)try{if(i=1,o&&(u=2&n[0]?o.return:n[0]?o.throw||((u=o.return)&&u.call(o),0):o.next)&&!(u=u.call(o,n[1])).done)return u;switch(o=0,u&&(n=[2&n[0],u.value]),n[0]){case 0:case 1:u=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,o=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(u=a.trys,!(u=u.length>0&&u[u.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!u||n[1]>u[0]&&n[1]<u[3])){a.label=n[1];break}if(6===n[0]&&a.label<u[1]){a.label=u[1],u=n;break}if(u&&a.label<u[2]){a.label=u[2],a.ops.push(n);break}u[2]&&a.ops.pop(),a.trys.pop();continue}n=e.call(t,a)}catch(t){n=[6,t],o=0}finally{i=u=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,o,u,s,a={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return s={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},u=function(){function t(e){this.conf=t.validateConf(Object.assign({},t.defaultConf,e)),this.requestConf={maxRequest:this.conf.maxRequest,cacheAgeMin:this.conf.cacheAgeMin,axiosRequestConfig:{method:"get",url:"https://qiita.com/api/v2/users/"+this.conf.userId+"/items",params:{page:0,per_page:this.conf.perPage}}},this.api=new r.a}return t.validateConf=function(t){return t.perPage<=0&&(t.perPage=1),t.perPage>100&&(t.perPage=100),t.maxRequest<0&&(t.maxRequest=0),t},t.prototype.fetch=function(){return i(this,void 0,void 0,function(){var t,e,n,r;return o(this,function(i){switch(i.label){case 0:t=0,e=[],i.label=1;case 1:return t<this.conf.maxRequest?(t++,this.createNextRequest(),[4,this.fetchItems()]):[3,3];case 2:return n=i.sent(),r=this.isThereNextPage(n),e=e.concat(n),r?[3,1]:[3,3];case 3:return[2,e]}})})},t.prototype.fetchItems=function(){return i(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return[4,this.api.fetch(this.requestConf)];case 1:return[2,t.sent()]}})})},t.prototype.createNextRequest=function(){this.requestConf.axiosRequestConfig.params.page+=1},t.prototype.isThereNextPage=function(t){return 0!==t.length&&!(t.length<this.requestConf.axiosRequestConfig.params.per_page)},t.defaultConf={userId:"qiita",maxRequest:5,perPage:100,cacheAgeMin:15},t}()},function(t,e,n){"use strict";n.d(e,"a",function(){return a});var r=n(5),i=n.n(r),o=n(6),u=(n.n(o),this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(i,o){function u(t){try{a(r.next(t))}catch(t){o(t)}}function s(t){try{a(r.throw(t))}catch(t){o(t)}}function a(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(u,s)}a((r=r.apply(t,e||[])).next())})}),s=this&&this.__generator||function(t,e){function n(t){return function(e){return r([t,e])}}function r(n){if(i)throw new TypeError("Generator is already executing.");for(;a;)try{if(i=1,o&&(u=2&n[0]?o.return:n[0]?o.throw||((u=o.return)&&u.call(o),0):o.next)&&!(u=u.call(o,n[1])).done)return u;switch(o=0,u&&(n=[2&n[0],u.value]),n[0]){case 0:case 1:u=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,o=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(u=a.trys,!(u=u.length>0&&u[u.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!u||n[1]>u[0]&&n[1]<u[3])){a.label=n[1];break}if(6===n[0]&&a.label<u[1]){a.label=u[1],u=n;break}if(u&&a.label<u[2]){a.label=u[2],a.ops.push(n);break}u[2]&&a.ops.pop(),a.trys.pop();continue}n=e.call(t,a)}catch(t){n=[6,t],o=0}finally{i=u=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,o,u,s,a={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return s={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},a=function(){function t(){this.api=i.a,this.cache=o}return t.prototype.fetch=function(t){return u(this,void 0,void 0,function(){var e,n,r;return s(this,function(i){switch(i.label){case 0:return e=this.createCacheKey(t.axiosRequestConfig),n=this.getCache(e),null!=n?[2,Promise.resolve(n)]:[4,this.api.request(t.axiosRequestConfig)];case 1:return r=i.sent(),200!==r.status?[2,Promise.reject()]:(this.saveCache(e,r.data,t.cacheAgeMin),[2,r.data])}})})},t.prototype.getCache=function(t){return this.cache.get(t)},t.prototype.saveCache=function(t,e,n){this.cache.set(t,e,n)},t.prototype.createCacheKey=function(t){return t.url+"?"+this.createUriString(t.params)},t.prototype.createUriString=function(t){return Object.entries(t).map(function(t){return t.map(encodeURIComponent).join("=")}).join("&")},t}()},function(e,n){e.exports=t},function(t,n){t.exports=e},function(t,e,n){"use strict";n.d(e,"a",function(){return i});var r=n(0),i=function(){function t(e,n,r){if(this.dest=e,this.items=n,this.conf=Object.assign({},t.defaultConf,r),this.userTemplate=document.querySelector(this.conf.userTemplate),this.articleTemplate=document.querySelector(this.conf.articleTemplate),null!==this.dest)return this.userDest=e.querySelector(this.conf.userDest),void(this.articleDest=e.querySelector(this.conf.articleDest));this.userDest=document.querySelector(this.conf.userDest),this.articleDest=document.querySelector(this.conf.articleDest)}return t.prototype.render=function(){this.claimNoTransition(),this.renderUser(),this.renderArticles(),this.setSubject(),this.claimLoaded()},t.prototype.setSubject=function(){var t=this,e=this.dest.querySelectorAll(".js-subject");Array.from(e,function(e){e.innerText=t.conf.subject})},t.prototype.renderUser=function(){var t=this,e=function(e){var n=document.importNode(e.content,!0);return Object.entries(t.items.getUserToShow()).forEach(function(e){t.fillTemplate(n,e)}),n};this.renderView(this.userTemplate,this.userDest,e)},t.prototype.renderArticles=function(){var t=this,e=function(e){var n=document.createDocumentFragment();return t.items.getArticlesToShow().forEach(function(r){n.appendChild(t.createArticleFragment(e,r))}),n};this.renderView(this.articleTemplate,this.articleDest,e)},t.prototype.createArticleFragment=function(t,e){var n=this,r=document.importNode(t.content,!0);return Object.entries(e).forEach(function(t){return n.fillTemplate(r,t)}),r},t.prototype.renderView=function(t,e,n){if(null!==t&&null!==e){var r=n(t);e.appendChild(r)}},t.prototype.fillTemplate=function(t,e){var n=e[0],r=e[1],i=".js-"+n.replace(/_/g,"-"),o=t.querySelector(i);null!==o&&null!==r&&this.fillContent(n,r,o)},t.prototype.fillContent=function(t,e,n){if(void 0!==e){var i="number"==typeof e?r.b(e):e;if(null!==e)switch(t){case"url":case"website_url":n.setAttribute("href",i);break;case"profile_image_url":n.setAttribute("src",i);break;case"tags":i.forEach(function(t){var e=document.createElement("li");e.innerText=t.name,n.appendChild(e)});break;default:n.textContent=i}}},t.prototype.claimNoTransition=function(){null!==this.dest&&(this.conf.useTransition||this.dest.classList.add("is-no-transition"))},t.prototype.claimLoaded=function(){null!==this.dest&&this.conf.useTransition&&this.dest.classList.add("is-qiita-widget-loaded")},t.defaultConf={subject:"人気の投稿",userDest:".js-qiita-user",userTemplate:"#qiita-user-tpl",articleDest:".js-qiita-article",articleTemplate:"#qiita-article-tpl",useTransition:!0},t}()}]).default});
//# sourceMappingURL=lib.js.map