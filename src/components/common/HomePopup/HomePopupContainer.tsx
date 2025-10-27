import { useGetHomePopup } from '@/api/endpoint/homePopup/getHomePopup';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { HomePopup } from '@/components/common/HomePopup';
import HomePopupUploader from '@/components/common/HomePopup/HomePopupUploader';
import { IS_DEV } from '@/constants/env';
import { LATEST_GENERATION } from '@/constants/generation';

const HomePopupContainer = () => {
  const { data: myData } = useGetMemberOfMe();
  const { data: homePopupData } = useGetHomePopup();

  const isLastGeneration = myData?.generation === LATEST_GENERATION;
  const lastPopupData = homePopupData?.at(-1);

  // 팝업 데이터가 없는 경우
  if (!lastPopupData) {
    return IS_DEV ? <HomePopupUploader /> : null;
  }

  const { startDate, endDate, pcImageUrl, mobileImageUrl, linkUrl, openInNewTab, showOnlyToRecentGeneration } =
    lastPopupData;

  // 팝업 표시 기간 설정
  const now = new Date();
  const popupStart = new Date(`${startDate}T00:00:00+09:00`);
  const popupEnd = new Date(`${endDate}T23:59:59+09:00`);
  const isWithinPeriod = now >= popupStart && now <= popupEnd;

  // 팝업 표시 기간이 아닌 경우
  if (!isWithinPeriod) {
    return IS_DEV ? <HomePopupUploader /> : null;
  }

  // 최신 기수만 보기 옵션이 활성화인 경우
  if (showOnlyToRecentGeneration && !isLastGeneration) {
    return IS_DEV ? <HomePopupUploader /> : null;
  }

  return (
    <>
      <HomePopup
        pcImageUrl={pcImageUrl}
        mobileImageUrl={mobileImageUrl}
        linkUrl={linkUrl}
        openInNewTab={openInNewTab}
      />
      {IS_DEV && <HomePopupUploader />}
    </>
  );
};

export default HomePopupContainer;
