import React, { FC, HTMLAttributes } from 'react';

interface ImageWithFallbackProps extends HTMLAttributes<HTMLImageElement> {
  fallbackImage: string;
  alt?: string;
}
const ImageWithFallback: FC<ImageWithFallbackProps> = ({ alt, fallbackImage, ...props }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // prevent infinite loop
    e.currentTarget.src = fallbackImage;
  };

  return <img onError={handleError} alt={alt} {...props} />;
};

export default ImageWithFallback;
