import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import Footer from '@/components/common/Footer';
import ProperHeader from '@/components/common/Header/ProperHeader';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderFooterLayout: FC<HeaderLayoutProps> = ({ children }) => {
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);

  return (
    <>
      {/* 드롭다운 시 화면 밀림 방지용 클래스 추가. see: https://github.com/radix-ui/primitives/discussions/1100 */}
      <FixedSlot className={RemoveScroll.classNames.zeroRight}>
        <ProperHeader />
      </FixedSlot>
      <StyledContainer>{children}</StyledContainer>
      {!isMobile && <Footer />}
    </>
  );
};

export default HeaderFooterLayout;

const StyledContainer = styled.div`
  padding-top: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 56px;
  }
`;

const FixedSlot = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
`;
