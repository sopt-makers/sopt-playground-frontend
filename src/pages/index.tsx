import type { NextPage } from 'next';

import AuthRequired from '@/components/auth/AuthRequired';
import ActiveBannerSlot from '@/components/common/Banner/ActiveBannerSlot';
import FeedHomePage from '@/components/feed/page/FeedHomePage';
import ResolutionReadModal from '@/components/resolution/read/ResolutionReadModal';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  return (
    <AuthRequired>
      <ActiveBannerSlot />
      <ResolutionReadModal
        onClose={() => {
          console.log('모달 닫기');
        }}
      />
      <FeedHomePage />
    </AuthRequired>
  );
};

setLayout(Home, 'header');

export default Home;
