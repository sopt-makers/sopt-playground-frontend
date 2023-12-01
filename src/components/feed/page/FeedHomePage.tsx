import { ImpressionArea } from '@toss/impression-area';
import { FC, useEffect, useRef } from 'react';

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

  const viewedSet = useRef(new Set<string>());
  const timeoutTokenRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const handleFeedImpression = (feedId: string) => {
    viewedSet.current.add(feedId);
  };

  useEffect(() => {
    const fn = () => {
      if (timeoutTokenRef.current != null) {
        return;
      }

      timeoutTokenRef.current = setTimeout(() => {
        const ids = [...viewedSet.current.values()];

        console.log(ids);

        viewedSet.current.clear();
        timeoutTokenRef.current = null;
      }, 5000);
    };

    window.addEventListener('scroll', fn);

    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <Responsive only='desktop'>
        <DesktopCommunityLayout
          isDetailOpen={isDetailOpen}
          listSlot={
            <FeedList
              renderFeedDetailLink={({ children, feedId }) => (
                <ImpressionArea onImpressionStart={() => handleFeedImpression(feedId)}>
                  <LoggingImpression areaThreshold={0.5} eventKey='feedCard' param={{ feedId }}>
                    <LoggingClick eventKey='feedCard' param={{ feedId }}>
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
                <ImpressionArea onImpressionStart={() => handleFeedImpression(feedId)}>
                  <LoggingImpression areaThreshold={0.5} eventKey='feedCard' param={{ feedId }}>
                    <LoggingClick eventKey='feedCard' param={{ feedId }}>
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
