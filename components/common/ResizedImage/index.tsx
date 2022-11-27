import { FC, useState } from 'react';

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
  const [failed, setFailed] = useState(false);

  const handleLoadError = () => {
    setFailed(true);
  };

  return (
    <>
      {failed ? (
        <img src={src} alt={alt} className={className} onLoad={onLoad} loading='lazy' decoding='async' />
      ) : (
        <img
          src={getResizedImage(src, width)}
          srcSet={`${getResizedImage(src, width)} 1x, ${getResizedImage(src, width * 2)} 2x`}
          alt={alt}
          className={className}
          loading='lazy'
          decoding='async'
          onLoad={onLoad}
          onError={handleLoadError}
        />
      )}
    </>
  );
};

export default ResizedImage;
