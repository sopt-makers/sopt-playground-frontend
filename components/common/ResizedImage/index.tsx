import { FC, useRef, useState } from 'react';

import useEnterScreen from '@/hooks/useEnterScreen';

const WAIT_TIME = 2000;

const getResizedImage = (src: string, width: number) => {
  return `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=${width}&output=webp`;
};

interface ImageProps {
  className?: string;
  src: string;
  width: number;
  height?: number;
  alt?: string;

  onLoad?: () => void;
}

const ResizedImage: FC<ImageProps> = ({ className, src, width, alt, onLoad }) => {
  const [isUsingOriginal, setIsUsingOriginal] = useState(false);

  const timeoutTokenRef = useRef<ReturnType<typeof setTimeout>>();

  const cancelReplacementTimer = () => {
    if (timeoutTokenRef.current !== undefined) {
      clearTimeout(timeoutTokenRef.current);
    }
  };

  const handleResizedLoadError = () => {
    setIsUsingOriginal(true);
  };

  const handleResizedLoaded = () => {
    cancelReplacementTimer();
    onLoad?.();
  };

  const { ref: imgRef } = useEnterScreen<HTMLImageElement>(() => {
    timeoutTokenRef.current = setTimeout(() => {
      if (!imgRef.current?.complete) {
        setIsUsingOriginal(true);
      }
    }, WAIT_TIME);
  });

  return (
    <>
      {isUsingOriginal ? (
        <img src={src} alt={alt} className={className} onLoad={onLoad} loading='lazy' decoding='async' />
      ) : (
        <img
          ref={imgRef}
          src={getResizedImage(src, width)}
          srcSet={`${getResizedImage(src, width)} 1x, ${getResizedImage(src, width * 2)} 2x`}
          alt={alt}
          className={className}
          loading='lazy'
          decoding='async'
          onLoad={handleResizedLoaded}
          onError={handleResizedLoadError}
        />
      )}
    </>
  );
};

export default ResizedImage;
