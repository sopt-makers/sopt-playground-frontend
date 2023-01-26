import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import ProperHeader from '@/components/common/Header/ProperHeader';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderLayout: FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <>
      <FixedSlot className={RemoveScroll.classNames.zeroRight}>
        <ProperHeader />
      </FixedSlot>
      <StyledContainer>{children}</StyledContainer>
    </>
  );
};

export default HeaderLayout;

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
