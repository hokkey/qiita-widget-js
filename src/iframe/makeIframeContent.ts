import { QiitaWidgetParam } from '~lib/interface'

// Included via raw-loader:
import CSS from '~style/iframe.scss'
import HTML from '~iframe/view/basic.html'
import LIB from '~dist/lib.bundled.js'

export function makeIframeContent(data: QiitaWidgetParam, id: number): string {
  /* eslint-disable @typescript-eslint/restrict-template-expressions */
  return `
<style>${CSS}</style>
<div id="widget">${HTML}</div>
<script>
  ${LIB}
  (function() {
    new QiitaWidget(document.getElementById('widget'), ${JSON.stringify(data)}).init().then(() => {
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
