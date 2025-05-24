import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { HomePopup } from '@/components/common/HomePopup';
import Skeleton from '@/components/common/Skeleton';
import { LATEST_GENERATION } from '@/constants/generation';

interface HomePopupContainerProps {
  isOnlyLastGeneration: boolean;
}

const HomePopupContainer = ({ isOnlyLastGeneration }: HomePopupContainerProps) => {
  const { data: myData, isPending } = useGetMemberOfMe();
  const isLastGeneration = myData?.generation === LATEST_GENERATION;

  if (isPending) return <Skeleton height={168} margin='0 0 16px 0' />;

  if (isOnlyLastGeneration && !isLastGeneration) {
    return null;
  }

  return <HomePopup />;
};

export default HomePopupContainer;
