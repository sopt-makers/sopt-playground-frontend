import type { NextPage } from 'next';

import AuthRequired from '@/components/auth/AuthRequired';
import ActiveBannerSlot from '@/components/common/Banner/ActiveBannerSlot';
import HomePopupContainer from '@/components/common/HomePopupContainer';
import FeedHomePage from '@/components/feed/page/FeedHomePage';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  return (
    <AuthRequired>
      <HomePopupContainer />
      {/* 홈팝업 사용시에 주석제거 */}
      <ActiveBannerSlot />
      <FeedHomePage />
    </AuthRequired>
  );
};

setLayout(Home, 'header');

export default Home;
