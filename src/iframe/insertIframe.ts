import {makeIframeContent} from "./makeIframeContent";
import {pickDataset} from "./pickDataset";

export function insertIframe(target: HTMLElement):HTMLIFrameElement {

  const iframe = <HTMLIFrameElement>document.createElement('iframe');
  target.parentNode.insertBefore(iframe, target);

  const doc = iframe.contentWindow.document;
  const content: string = makeIframeContent(pickDataset(target));

  doc.open();
  doc.write(content);
  doc.close();

  return iframe;
}
