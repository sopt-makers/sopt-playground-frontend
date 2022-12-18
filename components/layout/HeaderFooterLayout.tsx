import styled from '@emotion/styled';
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
      <StyledContainer>{children}</StyledContainer>
      <Footer />
    </>
  );
};

export default HeaderFooterLayout;

const StyledContainer = styled.div`
  padding-top: 40px;
`;
