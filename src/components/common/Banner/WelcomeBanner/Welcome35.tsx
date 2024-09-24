import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import WelcomeBanner from '@/components/common/Banner/WelcomeBanner';
import { LATEST_GENERATION } from '@/constants/generation';

const Welcome35 = () => {
  const { data: myData, isPending } = useGetMemberOfMe();
  const is35 = myData?.generation === LATEST_GENERATION;

  if (isPending) return <></>;

  return <WelcomeBanner is35={is35} />;
};

export default Welcome35;
