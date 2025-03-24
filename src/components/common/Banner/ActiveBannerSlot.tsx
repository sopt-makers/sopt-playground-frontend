import styled from '@emotion/styled';
import { FC } from 'react';

import AdsBanner from '@/components/common/Banner/AdsBanner';
import WelcomeBannerContainer from '@/components/common/Banner/WelcomeBanner/WelcomeBannerContainer';

interface ActiveBannerSlotProps {}

const ActiveBannerSlot: FC<ActiveBannerSlotProps> = ({}) => {
  return (
    <StyledActiveBanner>
      {/* 이 밑에 노출할 배너를 넣으세요. */}
      {/* <AdsBanner /> */}
      <WelcomeBannerContainer />
      {/* ==== */}
    </StyledActiveBanner>
  );
};

export default ActiveBannerSlot;

const StyledActiveBanner = styled.div``;
