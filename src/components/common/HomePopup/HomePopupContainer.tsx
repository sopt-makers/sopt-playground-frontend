import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { HomePopup } from '@/components/common/HomePopup';
import Skeleton from '@/components/common/Skeleton';
import { LATEST_GENERATION } from '@/constants/generation';

interface HomePopupContainerProps {
  isOnlyLastGeneration: boolean;
}

const HomePopupContainer = ({ isOnlyLastGeneration }: HomePopupContainerProps) => {
  const { data: myData } = useGetMemberOfMe();
  const isLastGeneration = myData?.generation === LATEST_GENERATION;

  // 팝업 표시 기간 설정
  const now = new Date();
  const popupStart = new Date('2025-09-26T00:00:00+09:00');
  const popupEnd = new Date('2025-10-11T23:59:59+09:00');
  const isPopupPeriod = now >= popupStart && now <= popupEnd;

  if ((isOnlyLastGeneration && !isLastGeneration) || !isPopupPeriod) {
    return null;
  }

  return <HomePopup />;
};

export default HomePopupContainer;
