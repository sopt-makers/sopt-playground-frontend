import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import Header from '@/components/common/Header';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderLayout: FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <StyledContainer>{children}</StyledContainer>
    </>
  );
};

export default HeaderLayout;

const StyledContainer = styled.div`
  padding-top: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 0;
  }
`;
