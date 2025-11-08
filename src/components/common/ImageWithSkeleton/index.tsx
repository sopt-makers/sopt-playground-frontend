import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useState } from 'react';

import Skeleton from '@/components/common/Skeleton';

interface ImageWithSkeletonProps {
  src: string;
  alt?: string;
  height: number;
  className?: string;
}

const ImageWithSkeleton = ({ src, alt, height, className }: ImageWithSkeletonProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Container $height={height} $isLoaded={isLoaded}>
      {!isLoaded && <Skeleton width={height} height={height} borderRadius={12} />}
      <StyledImage
        src={src}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        loading='lazy'
        decoding='async'
        $isLoaded={isLoaded}
      />
    </Container>
  );
};

const Container = styled.div<{ $height: number; $isLoaded: boolean }>`
  display: inline-block;
  position: relative;
  border: 1px solid ${colors.gray900};
  border-radius: 12px;
  min-width: ${({ $height, $isLoaded }) => ($isLoaded ? 'auto' : `${$height}px`)};
  height: ${({ $height }) => `${$height}px`};
`;

const StyledImage = styled.img<{ $isLoaded: boolean }>`
  display: block;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  border-radius: inherit;
  width: ${({ $isLoaded }) => ($isLoaded ? 'auto' : '100%')};
  height: 100%;
  object-fit: cover;
`;

export default ImageWithSkeleton;
