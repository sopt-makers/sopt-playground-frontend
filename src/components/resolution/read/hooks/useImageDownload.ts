import html2canvas from 'html2canvas';
import { useRef } from 'react';

const useImageDownload = () => {
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    html2canvas(ref.current as HTMLDivElement, {
      backgroundColor: null,
      scale: 4,
    })
      .then((canvas: HTMLCanvasElement) => {
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
