import { forwardRef } from 'react';

import soulmateIcon from './files/soulmateIconFlag.png';

interface SoulmateIconFlagProps {
  className?: string;
}

const SoulmateIconFlag = forwardRef<HTMLImageElement, SoulmateIconFlagProps>(({ className }, ref) => {
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

export default SoulmateIconFlag;
