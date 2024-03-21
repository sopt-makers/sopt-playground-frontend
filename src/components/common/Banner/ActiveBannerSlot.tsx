import styled from '@emotion/styled';
import { FC } from 'react';

import Welcome34 from '@/components/common/Banner/WelcomeBanner/Welcome34';

interface ActiveBannerSlotProps {}

const ActiveBannerSlot: FC<ActiveBannerSlotProps> = ({}) => {
  return (
    <StyledActiveBanner>
      {/* 이 밑에 노출할 배너를 넣으세요. */}
      <Welcome34 />
      {/* ==== */}
    </StyledActiveBanner>
  );
};

export default ActiveBannerSlot;

const StyledActiveBanner = styled.div``;
