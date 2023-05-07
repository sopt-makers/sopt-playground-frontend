import styled from '@emotion/styled';
import { FC } from 'react';

import SOPKathonBanner from '@/components/common/Banner/SOPKathonBanner';

interface ActiveBannerSlotProps {}

const ActiveBannerSlot: FC<ActiveBannerSlotProps> = ({}) => {
  return (
    <StyledActiveBanner>
      {/* 이 안에 노출할 배너를 넣으세요. */}
      <SOPKathonBanner />
      {/* ==== */}
    </StyledActiveBanner>
  );
};

export default ActiveBannerSlot;

const StyledActiveBanner = styled.div``;
