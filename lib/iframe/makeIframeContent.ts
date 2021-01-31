import { QiitaWidgetParam } from '../interface'

// Included via raw-loader:
import * as CSS from 'lib/style/iframe.scss'
import * as HTML from 'lib/iframe/view/basic.html'
import * as LIB from 'dist/lib.bundled.js'

export function makeIframeContent(data: QiitaWidgetParam, id: number): string {
  /* eslint-disable @typescript-eslint/restrict-template-expressions */
  return `
<style>${CSS}</style>
<div id="widget">${HTML}</div>
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
</script>`
  /* eslint-enable @typescript-eslint/restrict-template-expressions */
}
