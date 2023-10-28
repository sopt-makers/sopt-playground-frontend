import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import Header from '@/components/common/Header';
import { createLayoutCSSVariable } from '@/components/layout/utils';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderLayout: FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <>
      <FixedSlot className={RemoveScroll.classNames.zeroRight}>
        <Header />
      </FixedSlot>
      <StyledContainer>{children}</StyledContainer>
    </>
  );
};

export default HeaderLayout;

const StyledContainer = styled.div`
  padding-top: 80px;

  ${createLayoutCSSVariable({ headerHeight: 80 })}

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 56px;

    ${createLayoutCSSVariable({ headerHeight: 56 })}
  }
`;

const FixedSlot = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
`;
