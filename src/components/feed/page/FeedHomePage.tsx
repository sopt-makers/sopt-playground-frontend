import { FC } from 'react';

import Responsive from '@/components/common/Responsive';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { LoggingImpression } from '@/components/eventLogger/components/LoggingImpression';
import { CategoryLink, FeedDetailLink, useFeedDetailParam } from '@/components/feed/common/queryParam';
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
          listSlot={
            <FeedList
              renderFeedDetailLink={({ children, feedId }) => (
                // TODO: to @tekiter 조회수 구현 시 변경해주세욤
                <LoggingImpression areaThreshold={0.5} eventKey='feedCard' param={{ feedId }}>
                  <LoggingClick eventKey='feedCard' param={{ feedId }}>
                    <FeedDetailLink feedId={feedId}>{children}</FeedDetailLink>
                  </LoggingClick>
                </LoggingImpression>
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
                  <CategoryLink categoryId={categoryId}>{children}</CategoryLink>
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
              renderFeedDetailLink={({ children, feedId }) => (
                // TODO: to @tekiter 조회수 구현 시 변경해주세욤
                <LoggingImpression areaThreshold={0.5} eventKey='feedCard' param={{ feedId }}>
                  <LoggingClick eventKey='feedCard' param={{ feedId }}>
                    <FeedDetailLink feedId={feedId}>{children}</FeedDetailLink>
                  </LoggingClick>
                </LoggingImpression>
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
