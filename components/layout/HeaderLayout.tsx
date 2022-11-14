import { FC, ReactNode } from 'react';

import Header from '@/components/common/Header';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderLayout: FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default HeaderLayout;
