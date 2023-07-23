import styled from '@emotion/styled';
import { FC } from 'react';

import RecruitingBanner from '@/components/common/Banner/RecruitingBanner';

interface ActiveBannerSlotProps {}

const ActiveBannerSlot: FC<ActiveBannerSlotProps> = ({}) => {
  return (
    <StyledActiveBanner>
      {/* 이 밑에 노출할 배너를 넣으세요. */}
      <RecruitingBanner />
      {/* ==== */}
    </StyledActiveBanner>
  );
};

export default ActiveBannerSlot;

const StyledActiveBanner = styled.div``;
