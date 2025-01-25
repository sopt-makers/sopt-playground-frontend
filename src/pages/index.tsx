import type { NextPage } from 'next';

import AuthRequired from '@/components/auth/AuthRequired';
import ActiveBannerSlot from '@/components/common/Banner/ActiveBannerSlot';
import { HomePopup } from '@/components/common/HomePopup';
import FeedHomePage from '@/components/feed/page/FeedHomePage';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  return (
    <AuthRequired>
      <HomePopup />
      <ActiveBannerSlot />
      <FeedHomePage />
    </AuthRequired>
  );
};

setLayout(Home, 'header');

export default Home;
