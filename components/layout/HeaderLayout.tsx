import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import Header from '@/components/common/Header';

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
  padding-top: 40px;
`;
