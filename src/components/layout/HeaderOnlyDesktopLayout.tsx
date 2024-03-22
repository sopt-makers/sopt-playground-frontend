import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import Header from '@/components/common/Header';
import Responsive from '@/components/common/Responsive';
import { createLayoutCSSVariable } from '@/components/layout/utils';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderOnlyDesktopLayout: FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <>
      <Responsive only='desktop'>
        <FixedSlot className={RemoveScroll.classNames.zeroRight}>
          <Header />
        </FixedSlot>
      </Responsive>
      <StyledContainer>{children}</StyledContainer>
    </>
  );
};

export default HeaderOnlyDesktopLayout;

const StyledContainer = styled.div`
  padding-top: 80px;

  /* TODO: 환영배너 내려간 후, headerHeight: 80으로 반드시 변경 */
  ${createLayoutCSSVariable({ headerHeight: 248 })}

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 0;

    ${createLayoutCSSVariable({ headerHeight: 0 })}
  }
`;

const FixedSlot = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
`;
