import styled from '@emotion/styled';
import { FC } from 'react';

import SOPTMATEBanner from '@/components/common/Banner/SOPTMATEBanner';

interface ActiveBannerSlotProps {}

const ActiveBannerSlot: FC<ActiveBannerSlotProps> = ({}) => {
  return (
    <StyledActiveBanner>
      {/* 이 안에 노출할 배너를 넣으세요. */}
      {/* <SOPTMATEBanner /> */}
      {/* ==== */}
    </StyledActiveBanner>
  );
};

export default ActiveBannerSlot;

const StyledActiveBanner = styled.div``;
