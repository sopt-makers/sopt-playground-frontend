import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

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
  padding-top: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 0;
  }
`;
