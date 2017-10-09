import {QiitaWidgetParam} from "../interface";

import * as CSS from "lib/style/iframe.scss";

// Included via raw-loader:
import * as HTML from "lib/iframe/view/basic.html";
import * as LIB from "dist/lib.js";

export function makeIframeContent(data: QiitaWidgetParam, id: number): string {
  return `
<style>${CSS}</style>
<div id="widget">${HTML}</div>
<script src="https://unpkg.com/axios@0.16.2/dist/axios.min.js"></script>
<script src="https://unpkg.com/localforage@1.5.1/dist/localforage.min.js"></script>
<script src="https://unpkg.com/axios-cache-adapter@1.5.2/dist/cache.bundled.min.js"></script>
<script>
  ${LIB}
  (function() {
    var widget = document.getElementById('widget');
    
    new QiitaWidget(widget, ${JSON.stringify(data)}).init().then(() => {
      document.body.classList.remove('is-iframe-loading');
      
      var body = document.body;
      var html = document.documentElement;
      var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      
      parent.window.postMessage({
        id: ${id},
        height: height      
      }, location.href);
    });
  })();
</script>`;
  }
