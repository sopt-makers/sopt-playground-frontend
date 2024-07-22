import html2canvas from 'html2canvas';
import { useRef } from 'react';

const useImageDownload = () => {
  const ref = useRef<HTMLDivElement>(null);

  const removePaddingCss = `
  body > div:last-child > span + img {
    display: inline !important;
  }
`;

  const style = document.createElement('style');

  const createStyle = (css: string) => {
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  };

  const removeStyle = () => {
    if (style.parentNode) {
      style.parentNode.removeChild(style);
    }
  };

  const onClick = () => {
    createStyle(removePaddingCss);
    html2canvas(ref.current as HTMLDivElement, {
      backgroundColor: null,
      scale: 4,
    })
      .then((canvas: HTMLCanvasElement) => {
        removeStyle();
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'test.png';
        link.click();
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };

  return { ref, onClick };
};

export default useImageDownload;
