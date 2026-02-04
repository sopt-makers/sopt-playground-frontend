import styled from '@emotion/styled';
import { FC } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import AdsBanner from '@/components/common/Banner/AdsBanner';
import BalanceGameBanner from '@/components/common/Banner/BalanceGameBanner';
import { ClosingBanner } from '@/components/common/Banner/ClosingBanner';
import WelcomeBannerContainer from '@/components/common/Banner/WelcomeBanner/WelcomeBannerContainer';
interface ActiveBannerSlotProps {}

const ActiveBannerSlot: FC<ActiveBannerSlotProps> = ({}) => {
  const isTimecapsopOpen = false; // 타임캡솝 오픈 기간에만 이 값을 true로 변경
  const { data: myData } = useGetMemberOfMe();
  const isBalanceGameOpen = false;

  return (
    <StyledActiveBanner>
      {/* 이 밑에 노출할 배너를 넣으세요. */}
      {isTimecapsopOpen ? (
        <ClosingBanner />
      ) : isBalanceGameOpen && myData?.enableWorkPreferenceEvent ? (
        <BalanceGameBanner />
      ) : (
        <AdsBanner />
      )}
    </StyledActiveBanner>
  );
};

export default ActiveBannerSlot;

const StyledActiveBanner = styled.div``;
