import type { NextPage } from 'next';

import AuthRequired from '@/components/auth/AuthRequired';
import ActiveBannerSlot from '@/components/common/Banner/ActiveBannerSlot';
import FeedHomePage from '@/components/feed/page/FeedHomePage';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  return (
    <AuthRequired>
      <ActiveBannerSlot />
      <FeedHomePage />
    </AuthRequired>
  );
};

// TODO: 환영배너 내린 후, 'header'로 변경
setLayout(Home, 'headerOnlyDesktop');

export default Home;
