import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import ProperHeader from '@/components/common/Header/ProperHeader';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderLayout: FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <>
      <ProperHeader />
      <StyledContainer>{children}</StyledContainer>
    </>
  );
};

export default HeaderLayout;

const StyledContainer = styled.div``;
