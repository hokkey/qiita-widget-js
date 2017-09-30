import {makeIframeContent} from "./makeIframeContent";
import {pickDataset} from "./pickDataset";

export function insertIframe(target: HTMLElement, id: number):HTMLIFrameElement {

  const iframe = <HTMLIFrameElement>document.createElement('iframe');
  target.appendChild(iframe);

  const doc = iframe.contentDocument;
  const content: string = makeIframeContent(pickDataset(target), id);

  doc.open();
  doc.write(content);
  doc.body.classList.add('is-iframe-loading');
  doc.close();

  return iframe;
}
