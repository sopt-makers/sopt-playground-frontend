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

// 환영배너 삽입시, 'headerOnlyDesktop'로 변경
setLayout(Home, 'header');

export default Home;
