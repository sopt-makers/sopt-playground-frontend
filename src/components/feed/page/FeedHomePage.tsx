import { FC } from 'react';

import Responsive from '@/components/common/Responsive';
import { useFeedDetailParam } from '@/components/feed/common/queryParam';
import FeedDetail from '@/components/feed/detail/FeedDetail';
import FeedList from '@/components/feed/list/FeedList';
import DesktopCommunityLayout from '@/components/feed/page/layout/DesktopCommunityLayout';
import MobileCommunityLayout from '@/components/feed/page/layout/MobileCommunityLayout';

const CommunityPage: FC = () => {
  const [feedId] = useFeedDetailParam();

  const isDetailOpen = feedId != null && feedId !== '';

  return (
    <>
      <Responsive only='desktop'>
        <DesktopCommunityLayout
          isDetailOpen={isDetailOpen}
          listSlot={<FeedList />}
          detailSlot={feedId ? <FeedDetail feedId={feedId} /> : null}
        />
      </Responsive>
      <Responsive only='mobile'>
        <MobileCommunityLayout
          isDetailOpen={isDetailOpen}
          listSlot={<FeedList />}
          detailSlot={feedId ? <FeedDetail feedId={feedId} /> : null}
        />
      </Responsive>
    </>
  );
};

export default CommunityPage;
