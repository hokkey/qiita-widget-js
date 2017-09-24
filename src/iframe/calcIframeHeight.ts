export function calcIframeHeight(iframe: HTMLIFrameElement):void {
  // Calc height from content size if height is 'auto'
  const setHeight = () => {
    iframe.height = iframe.contentWindow.document.documentElement.scrollHeight.toString();
  };

  const updateHeight = () => {
    setHeight();
    iframe.removeEventListener('load', updateHeight);
  };

  setHeight();
  iframe.addEventListener('load', updateHeight);
}
