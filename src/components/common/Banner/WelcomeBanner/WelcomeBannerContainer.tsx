import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import WelcomeBanner from '@/components/common/Banner/WelcomeBanner';
import Skeleton from '@/components/common/Skeleton';
import { LATEST_GENERATION } from '@/constants/generation';

const WelcomeBannerContainer = () => {
  const { data: myData, isPending } = useGetMemberOfMe();
  const isLastGeneration = myData?.generation === LATEST_GENERATION;

  if (isPending) return <Skeleton height={168} margin='0 0 16px 0' />;

  return <WelcomeBanner isLastGeneration={isLastGeneration} />;
};

export default WelcomeBannerContainer;
