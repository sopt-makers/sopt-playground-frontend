import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import { createLayoutCSSVariable } from '@/components/layout/utils';

interface FullScreenLayoutProps {
  children: ReactNode;
}

const FullScreenLayout: FC<FullScreenLayoutProps> = ({ children }) => {
  return <StyledFullScreenLayout>{children}</StyledFullScreenLayout>;
};

export default FullScreenLayout;

const StyledFullScreenLayout = styled.div`
  height: 100vh;

  @supports (height: 100dvh) {
    height: 100dvh;
  }

  ${createLayoutCSSVariable({ headerHeight: 0 })}
`;
