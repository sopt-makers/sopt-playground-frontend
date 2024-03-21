import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import WelcomeBanner from '@/components/common/Banner/WelcomeBanner';
import { LATEST_GENERATION } from '@/constants/generation';

const Welcome34 = () => {
  const { data: myData } = useGetMemberOfMe();
  const is34 = myData?.generation === LATEST_GENERATION;

  return <WelcomeBanner is34={is34} />;
};

export default Welcome34;
