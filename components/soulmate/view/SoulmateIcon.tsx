import { forwardRef } from 'react';

import soulmateIcon from '../soulmateIcon.png';

interface SoulmateIconProps {
  className?: string;
}

const SoulmateIcon = forwardRef<HTMLImageElement, SoulmateIconProps>(({ className }, ref) => {
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

export default SoulmateIcon;
