import html2canvas from 'html2canvas';
import { useRef } from 'react';

const useImageDownload = (fileName: string) => {
  const ref = useRef<HTMLDivElement>(null);
  const style = typeof window !== 'undefined' ? document.createElement('style') : null;

  const removePaddingCss = `
    body > div:last-child > span + img {
      display: inline !important;
    }
  `;

  const createStyle = (css: string) => {
    if (!style) return;
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  };

  const removeStyle = () => {
    if (style?.parentNode) {
      style.parentNode.removeChild(style);
    }
  };

  const onClick = () => {
    if (typeof window === 'undefined') return;

    createStyle(removePaddingCss);
    html2canvas(ref.current as HTMLDivElement, {
      backgroundColor: null,
      scale: 4,
    })
      .then((canvas) => {
        removeStyle();
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${fileName}.png`;
        link.click();
      })
      .catch(console.error);
  };

  return { ref, onClick };
};

export default useImageDownload;
