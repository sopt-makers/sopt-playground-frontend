import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import Footer from '@/components/common/Footer';
import ProperHeader from '@/components/common/Header/ProperHeader';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderFooterLayout: FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <>
      <ProperHeader />
      <StyledContainer>{children}</StyledContainer>
      <Footer />
    </>
  );
};

export default HeaderFooterLayout;

const StyledContainer = styled.div``;
