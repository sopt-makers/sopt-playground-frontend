import { forwardRef } from 'react';

import soulmateIcon from './files/soulmateIconHeart.png';

interface SoulmateIconHeartProps {
  className?: string;
}

const SoulmateIconHeart = forwardRef<HTMLImageElement, SoulmateIconHeartProps>(({ className }, ref) => {
  return (
    <img
      ref={ref}
      src={soulmateIcon.src}
      alt='soulmateIcon'
      width={soulmateIcon.width}
      height={soulmateIcon.height}
      className={className}
    />
  );
});

export default SoulmateIconHeart;
