import styled from '@emotion/styled';
import { forwardRef, useEffect, useState } from 'react';

interface ImageSize {
  width: number | 'auto';
  height: number | 'auto';
}

interface DynamicImageProps {
  className?: string;
  src: string;
  alt?: string;
  targetSize?: number;
}
/**
 *
 * @param targetSize width와 height 중 더 큰 값을 targetSize로 맞추고, 나머지 하나는 비율에 맞게 조정하여 렌더링 하는 컴포넌트
 * @returns
 */
export const DynamicImage = forwardRef<HTMLImageElement, DynamicImageProps>(
  ({ className, src, alt, targetSize = 600 }) => {
    const [imageSize, setImageSize] = useState<ImageSize>({
      width: 'auto',
      height: 'auto',
    });

    useEffect(() => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        const originalWidth = img.width;
        const originalHeight = img.height;

        if (originalWidth < targetSize && originalHeight < targetSize) {
          // 이미지가 targetSize보다 작으면 그대로 렌더링
          return;
        }

        if (originalWidth > originalHeight) {
          setImageSize((prev) => ({ ...prev, width: targetSize }));
        } else {
          setImageSize((prev) => ({ ...prev, height: targetSize }));
        }
      };
    }, [src, targetSize]);

    return (
      <img
        className={className}
        css={{
          objectFit: 'cover',
          width: imageSize.width,
          height: imageSize.height,
        }}
        alt={alt}
        src={src}
        width={imageSize.width}
        height={imageSize.height}
      />
    );
  },
);
