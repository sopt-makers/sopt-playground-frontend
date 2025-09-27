import type { NextPage } from 'next';

import AuthRequired from '@/components/auth/AuthRequired';
import ActiveBannerSlot from '@/components/common/Banner/ActiveBannerSlot';
import HomePopupContainer from '@/components/common/HomePopup/HomePopupContainer';
import FeedHomePage from '@/components/feed/page/FeedHomePage';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  return (
    <AuthRequired>
      <HomePopupContainer isOnlyLastGeneration={true} />
      <ActiveBannerSlot />
      <FeedHomePage />

      {/* 홈팝업 사용시에 주석제거 */}
    </AuthRequired>
  );
};

setLayout(Home, 'header');

export default Home;
