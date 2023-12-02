import { FC, useCallback, useRef, useState } from 'react';

import useEnterScreen from '@/hooks/useEnterScreen';

const WAIT_TIME = 2000;

type ImageProps = {
  className?: string;
  src: string;
  width?: number;
  height?: number;
  alt?: string;

  onLoad?: () => void;
} & ({ width: number } | { height: number }); // Width나 Height 둘중 하나는 있어야함

const ResizedImage: FC<ImageProps> = ({ className, src, width, height, alt, onLoad }) => {
  const [isUsingOriginal, setIsUsingOriginal] = useState(false);

  const timeoutTokenRef = useRef<ReturnType<typeof setTimeout>>();

  const getResizedImage = useCallback(
    (scale: number) => {
      if (width != null) {
        return `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=${width * scale}&output=webp`;
      }
      if (height != null) {
        return `https://wsrv.nl/?url=${encodeURIComponent(src)}&h=${height * scale}&output=webp`;
      }
      return undefined;
    },
    [height, src, width],
  );

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

  const { ref: imgRef } = useEnterScreen<HTMLImageElement>({
    onEnter: () => {
      if (imgRef.current?.complete) {
        return;
      }

      timeoutTokenRef.current = setTimeout(() => {
        if (!imgRef.current?.complete) {
          setIsUsingOriginal(true);
        }
      }, WAIT_TIME);
    },
  });

  return (
    <>
      {isUsingOriginal ? (
        <img src={src} alt={alt} className={className} onLoad={onLoad} loading='lazy' decoding='async' />
      ) : (
        <img
          ref={imgRef}
          src={getResizedImage(1)}
          srcSet={`${getResizedImage(1)} 1x, ${getResizedImage(2)} 2x`}
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
