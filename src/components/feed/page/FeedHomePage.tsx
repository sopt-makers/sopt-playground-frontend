import Link from 'next/link';
import { FC } from 'react';

import Responsive from '@/components/common/Responsive';
import { CategoryLink, FeedDetailLink, useFeedDetailParam } from '@/components/feed/common/queryParam';
import FeedDetail from '@/components/feed/detail/FeedDetail';
import FeedList from '@/components/feed/list/FeedList';
import DesktopCommunityLayout from '@/components/feed/page/layout/DesktopCommunityLayout';
import MobileCommunityLayout from '@/components/feed/page/layout/MobileCommunityLayout';
import { playgroundLink } from '@/constants/links';

const CommunityPage: FC = () => {
  const [postId] = useFeedDetailParam();

  const isDetailOpen = postId != null && postId !== '';

  return (
    <>
      <Responsive only='desktop'>
        <DesktopCommunityLayout
          isDetailOpen={isDetailOpen}
          listSlot={
            <FeedList
              renderFeedDetailLink={({ children, feedId }) => (
                <FeedDetailLink feedId={feedId}>{children}</FeedDetailLink>
              )}
            />
          }
          detailSlot={
            postId ? (
              <FeedDetail
                postId={postId}
                renderCategoryLink={({ children, categoryId }) => (
                  <CategoryLink categoryId={categoryId}>{children}</CategoryLink>
                )}
              />
            ) : null
          }
        />
      </Responsive>
      <Responsive only='mobile'>
        <MobileCommunityLayout
          listSlot={
            <FeedList
              renderFeedDetailLink={({ children, feedId }) => (
                <Link href={playgroundLink.feedDetail(feedId)}>{children}</Link>
              )}
            />
          }
        />
      </Responsive>
    </>
  );
};

export default CommunityPage;
