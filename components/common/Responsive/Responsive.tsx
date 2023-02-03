import { FC, ReactNode, useContext } from 'react';

import { ResponsiveContext } from '@/components/common/Responsive/context';

interface ResponsiveProps {
  children: ReactNode;
  only: 'mobile' | 'desktop';
}

const Responsive: FC<ResponsiveProps> = ({ children, only }) => {
  const { mobileOnlyClassName, desktopOnlyClassName } = useContext(ResponsiveContext);

  const selectedClassName = (() => {
    if (only === 'desktop') {
      return desktopOnlyClassName;
    } else if (only === 'mobile') {
      return mobileOnlyClassName;
    }
  })();

  return <div className={selectedClassName}>{children}</div>;
};

export default Responsive;
