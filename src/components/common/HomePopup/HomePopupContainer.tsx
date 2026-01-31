import { useEffect, useState } from 'react';

import { useGetHomePopup } from '@/api/endpoint/homePopup/getHomePopup';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { HomePopup } from '@/components/common/HomePopup';
import useModalState from '@/components/common/Modal/useModalState';
import { useMatchMemberEvent } from '@/components/matchmember/hooks/useMatchMemberEvent';
import MatchMemberModal from '@/components/matchmember/MatchMemberModal';
import { LATEST_GENERATION } from '@/constants/generation';

const HomePopupContainer = () => {
  const { data: myData } = useGetMemberOfMe();
  const { data: homePopupData } = useGetHomePopup();
  const isLastGeneration = myData?.generation === LATEST_GENERATION;

  // if (!homePopupData || typeof homePopupData === 'string') {
  //   return null;
  // }

  // const { startDate, endDate, pcImageUrl, mobileImageUrl, linkUrl, openInNewTab, showOnlyToRecentGeneration } =
  //   homePopupData;

  // // 팝업 표시 기간 설정
  // const now = new Date();
  // const popupStart = new Date(`${startDate}T00:00:00+09:00`);
  // const popupEnd = new Date(`${endDate}T23:59:59+09:00`);
  // const isWithinPeriod = now >= popupStart && now <= popupEnd;

  // 팝업 표시 기간이 아닌 경우
  // if (!isWithinPeriod) {
  //   return null;
  // }

  // 최신 기수만 보기 옵션이 활성화인 경우
  // if (showOnlyToRecentGeneration && !isLastGeneration) {
  //   return null;
  // }

  if (!isLastGeneration) {
    return null;
  }

  return (
    <>
      {/* <HomePopup
        pcImageUrl={pcImageUrl}
        mobileImageUrl={mobileImageUrl}
        linkUrl={linkUrl}
        openInNewTab={openInNewTab}
      /> */}
      <HomePopup
        pcImageUrl="/icons/img/popup/PC.png"
        mobileImageUrl="/icons/img/popup/MO.png"
        openInNewTab={false}
      />
    </>
  );
};

export default HomePopupContainer;
