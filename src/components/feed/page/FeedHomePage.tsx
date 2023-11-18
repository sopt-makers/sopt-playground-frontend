import { FC } from 'react';

import Responsive from '@/components/common/Responsive';
import { useFeedDetailParam } from '@/components/feed/common/queryParam';
import FeedDetail from '@/components/feed/detail/FeedDetail';
import FeedList from '@/components/feed/list/FeedList';
import DesktopCommunityLayout from '@/components/feed/page/layout/DesktopCommunityLayout';
import MobileCommunityLayout from '@/components/feed/page/layout/MobileCommunityLayout';

const CommunityPage: FC = () => {
  const [postId] = useFeedDetailParam();

  const isDetailOpen = postId != null && postId !== '';

  return (
    <>
      <Responsive only='desktop'>
        <DesktopCommunityLayout
          isDetailOpen={isDetailOpen}
          listSlot={<FeedList />}
          detailSlot={postId ? <FeedDetail postId={postId} /> : null}
        />
      </Responsive>
      <Responsive only='mobile'>
        <MobileCommunityLayout
          isDetailOpen={isDetailOpen}
          listSlot={<FeedList />}
          detailSlot={postId ? <FeedDetail postId={postId} /> : null}
        />
      </Responsive>
    </>
  );
};

export default CommunityPage;
