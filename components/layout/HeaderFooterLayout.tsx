import { FC, ReactNode } from 'react';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderFooterLayout: FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default HeaderFooterLayout;
