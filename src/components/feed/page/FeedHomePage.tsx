import { useQueryClient } from '@tanstack/react-query';
import { ImpressionArea } from '@toss/impression-area';
import Link from 'next/link';
import { FC } from 'react';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import Responsive from '@/components/common/Responsive';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { LoggingImpression } from '@/components/eventLogger/components/LoggingImpression';
import { useHit } from '@/components/feed/common/hooks/useHit';
import { CategoryLink, FeedDetailLink, useFeedDetailParam } from '@/components/feed/common/queryParam';
import FeedDetail from '@/components/feed/detail/FeedDetail';
import FeedList from '@/components/feed/list/FeedList';
import DesktopCommunityLayout from '@/components/feed/page/layout/DesktopCommunityLayout';
import MobileCommunityLayout from '@/components/feed/page/layout/MobileCommunityLayout';
import { playgroundLink } from '@/constants/links';

const CommunityPage: FC = () => {
  const queryClient = useQueryClient();
  const [postId] = useFeedDetailParam();
  const { queueHit } = useHit();

  const isDetailOpen = postId != null && postId !== '';

  return (
    <>
      <Responsive only='desktop'>
        <DesktopCommunityLayout
          isDetailOpen={isDetailOpen}
          listSlot={
            <FeedList
              renderFeedDetailLink={({ children, feedId, category }) => (
                <ImpressionArea onImpressionStart={() => queueHit(feedId)}>
                  <LoggingImpression areaThreshold={0.5} eventKey='feedCard' param={{ feedId }}>
                    <LoggingClick eventKey='feedCard' param={{ feedId, category }}>
                      <FeedDetailLink feedId={feedId}>{children}</FeedDetailLink>
                    </LoggingClick>
                  </LoggingImpression>
                </ImpressionArea>
              )}
            />
          }
          detailSlot={
            postId ? (
              <FeedDetail
                postId={postId}
                renderBackLink={({ children }) => (
                  <LoggingClick eventKey='feedBackButton' param={{ feedId: postId, referral: 'more' }}>
                    <FeedDetailLink feedId={undefined}>{children}</FeedDetailLink>
                  </LoggingClick>
                )}
                renderCategoryLink={({ children, categoryId }) => (
                  <CategoryLink
                    categoryId={categoryId}
                    onClick={() => {
                      queryClient.invalidateQueries({ queryKey: useGetPostsInfiniteQuery.getKey(categoryId) });
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    {children}
                  </CategoryLink>
                )}
              />
            ) : null
          }
        />
      </Responsive>
      <Responsive only='mobile'>
        <MobileCommunityLayout
          isDetailOpen={isDetailOpen}
          listSlot={
            <FeedList
              renderFeedDetailLink={({ children, feedId, category }) => (
                <ImpressionArea onImpressionStart={() => queueHit(feedId)}>
                  <LoggingImpression areaThreshold={0.5} eventKey='feedCard' param={{ feedId }}>
                    <LoggingClick eventKey='feedCard' param={{ feedId, category }}>
                      <Link
                        href={{
                          pathname: playgroundLink.feedDetail(feedId),
                        }}
                      >
                        {children}
                      </Link>
                    </LoggingClick>
                  </LoggingImpression>
                </ImpressionArea>
              )}
            />
          }
          detailSlot={
            postId ? (
              <FeedDetail
                postId={postId}
                renderBackLink={({ children }) => (
                  <LoggingClick eventKey='feedBackButton' param={{ feedId: postId, referral: 'more' }}>
                    <FeedDetailLink feedId={undefined}>{children}</FeedDetailLink>
                  </LoggingClick>
                )}
                renderCategoryLink={({ children, categoryId }) => (
                  <CategoryLink categoryId={categoryId} transformQuery={(query) => ({ ...query, feed: '' })}>
                    {children}
                  </CategoryLink>
                )}
              />
            ) : null
          }
        />
      </Responsive>
    </>
  );
};

export default CommunityPage;
