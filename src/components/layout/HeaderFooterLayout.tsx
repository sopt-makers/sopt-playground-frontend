import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Responsive from '@/components/common/Responsive';
import { createLayoutCSSVariable } from '@/components/layout/utils';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderFooterLayout: FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <>
      {/* 드롭다운 시 화면 밀림 방지용 클래스 추가. see: https://github.com/radix-ui/primitives/discussions/1100 */}
      <FixedSlot className={RemoveScroll.classNames.zeroRight}>
        <Header />
      </FixedSlot>
      <StyledContainer>{children}</StyledContainer>
      <Responsive only='desktop'>
        <Footer />
      </Responsive>
    </>
  );
};

export default HeaderFooterLayout;

const StyledContainer = styled.div`
  padding-top: 80px;

  ${createLayoutCSSVariable({ headerHeight: 80 })}

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 56px;

    ${createLayoutCSSVariable({ headerHeight: 80 })}
  }
`;

const FixedSlot = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
`;
