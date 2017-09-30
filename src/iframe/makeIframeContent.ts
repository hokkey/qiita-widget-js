import {QiitaWidgetParam} from "../Interface";

import * as CSS from "css/iframe.scss";
// Included via raw-loader:
import * as HTML from "../view/basic.html";
import * as LIB from "../../dist/lib.js";

export function makeIframeContent(data: QiitaWidgetParam, id: number): string {
  return `
<style>${CSS}</style>
${HTML}
<script>${LIB}</script>

<script>
  (function() {
    new QiitaWidget(${JSON.stringify(data)}).init().then(() => {
      document.body.classList.remove('is-iframe-loading');
      
      const body = document.body;
      const html = document.documentElement;
      const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      
      parent.window.postMessage({
        id: ${id},
        height: height      
      }, location.href);
    });
  })();
</script>`;
  }
