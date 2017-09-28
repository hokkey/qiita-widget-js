import {QiitaWidgetParam} from "../Interface";

import * as CSS from "css/iframe.scss";
// Included via raw-loader:
import * as HTML from "../view/basic.html";
import * as LIB from "../../dist/lib.js";

export function makeIframeContent(data: QiitaWidgetParam): string {
  return `
<style>${CSS}</style>
${HTML}
<script>${LIB}</script>

<script>
  (function() {
    new QiitaWidget(${JSON.stringify(data)}).init();
  })();
</script>`;
  }
