import styled from '@emotion/styled';
import { FC } from 'react';

import AdsBanner from '@/components/common/Banner/AdsBanner';
import { ClosingBanner } from '@/components/common/Banner/ClosingBanner';
import WelcomeBannerContainer from '@/components/common/Banner/WelcomeBanner/WelcomeBannerContainer';
interface ActiveBannerSlotProps {}

const ActiveBannerSlot: FC<ActiveBannerSlotProps> = ({}) => {
  const isTimecapsopOpen = true; // 타임캡솝 오픈 기간에만 이 값을 true로 변경
  return (
    <StyledActiveBanner>
      {/* 이 밑에 노출할 배너를 넣으세요. */}
      {isTimecapsopOpen ? <WelcomeBannerContainer /> : <AdsBanner />}
      <WelcomeBannerContainer />
    </StyledActiveBanner>
  );
};

export default ActiveBannerSlot;

const StyledActiveBanner = styled.div``;
