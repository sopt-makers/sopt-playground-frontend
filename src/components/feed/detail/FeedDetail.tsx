import { colors } from '@sopt-makers/colors';
import { IconAlertTriangle, IconTrash, IconWrite } from '@sopt-makers/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Flex } from '@toss/emotion-utils';
import { ErrorBoundary } from '@toss/error-boundary';
import Link from 'next/link';
import { playgroundLink } from 'playground-common/export';
import { createContext, ReactNode, useRef } from 'react';
import { useState } from 'react';

import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import useCategory from '@/components/feed/common/hooks/useCategory';
import { useCategoryInfo } from '@/components/feed/common/hooks/useCurrentCategory';
import { useDeleteFeed } from '@/components/feed/common/hooks/useDeleteFeed';
import { useFeedReferral } from '@/components/feed/common/hooks/useFeedReferral';
import type { Member } from '@/components/feed/common/hooks/useMention';
import { useReportFeed } from '@/components/feed/common/hooks/useReportFeed';
import { useShareFeed } from '@/components/feed/common/hooks/useShareFeed';
import { useCategoryParam } from '@/components/feed/common/queryParam';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';
import FeedDetailComments from '@/components/feed/detail/FeedDetailComments';
import FeedDetailContent from '@/components/feed/detail/FeedDetailContent';
import FeedDetailInput from '@/components/feed/detail/FeedDetailInput';
interface FeedDetailProps {
  postId: string;
  renderCategoryLink: (props: { children: ReactNode; categoryId: string }) => ReactNode;
  renderBackLink: (props: { children: ReactNode }) => ReactNode;
}
export const ReplyContext = createContext<{
  member: Member | null;
  replyTargetCommentId: number | null;

  setReplyState: React.Dispatch<
    React.SetStateAction<{
      member: Member | null;
      replyTargetCommentId: number | null;
    }>
  >;
}>({
  member: null,
  replyTargetCommentId: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setReplyState: () => {},
});

const FeedDetail = ({ postId, renderCategoryLink, renderBackLink }: FeedDetailProps) => {
  const queryClient = useQueryClient();
  const { handleShareFeed } = useShareFeed();
  const { handleDeleteFeed } = useDeleteFeed();
  const { handleReport: handleReportFeed } = useReportFeed();

  const { data: postData } = useGetPostQuery(postId);
  const { data: commentData } = useGetCommentQuery(postId);
  const currentCategory = useCategoryInfo(postData?.posts.categoryId.toString());
  const containerRef = useRef<HTMLDivElement>(null);
  const [categoryId] = useCategoryParam();
  const { findParentCategory } = useCategory();
  const { referral } = useFeedReferral();

  const [replyState, setReplyState] = useState<{
    member: Member | null;
    replyTargetCommentId: number | null;
  }>({
    member: null,
    replyTargetCommentId: null,
  });
  if (postData == null || commentData == null) {
    return null;
  }

  const children = findParentCategory(postData.posts.categoryId)?.children ?? [];

  return (
    <ReplyContext.Provider value={{ ...replyState, setReplyState }}>
      <DetailFeedCard>
        <DetailFeedCard.Header
          category={currentCategory?.category?.name ?? ''}
          tag={currentCategory?.tag?.name ?? '전체'}
          hasChildren={children.length > 0}
          categoryId={postData.posts.categoryId.toString()}
          renderCategoryLink={renderCategoryLink}
          left={renderBackLink({
            children: <DetailFeedCard.Icon name='chevronLeft' />,
          })}
          right={
            <>
              <LoggingClick eventKey='feedShareButton' param={{ feedId: postId, referral }}>
                <button onClick={() => handleShareFeed(postId)}>
                  <DetailFeedCard.Icon name='share' />
                </button>
              </LoggingClick>
              <FeedDropdown
                trigger={
                  <button>
                    <DetailFeedCard.Icon name='moreVertical' />
                  </button>
                }
              >
                {postData.isMine ? (
                  <>
                    <Link href={playgroundLink.feedEdit(postId)}>
                      <FeedDropdown.Item>
                        <Flex align='center' css={{ gap: '10px', color: `${colors.gray10} ` }}>
                          <IconWrite css={{ width: '16px', height: '16px' }} />
                          수정
                        </Flex>
                      </FeedDropdown.Item>
                    </Link>

                    <FeedDropdown.Item
                      type='danger'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFeed({ postId });
                      }}
                    >
                      <Flex align='center' css={{ gap: '10px' }}>
                        <IconTrash css={{ width: '16px', height: '16px' }} />
                        삭제
                      </Flex>
                    </FeedDropdown.Item>
                  </>
                ) : (
                  <FeedDropdown.Item
                    type='danger'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReportFeed({ postId });
                    }}
                  >
                    <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                      <IconAlertTriangle css={{ width: '16px', height: '16px' }} />
                      신고
                    </Flex>
                  </FeedDropdown.Item>
                )}
              </FeedDropdown>
            </>
          }
        />
        <DetailFeedCard.Body ref={containerRef}>
          <ErrorBoundary
            renderFallback={(error) => (
              <div css={{ textAlign: 'center' }}>
                글을 보여주는 데 문제가 발생했어요.
                <br />({error.error.message})
              </div>
            )}
          >
            <FeedDetailContent postId={postId} />
          </ErrorBoundary>
          <DetailFeedCard.Divider />
          <ErrorBoundary
            renderFallback={(error) => (
              <div css={{ textAlign: 'center' }}>
                댓글을 보여주는 데 문제가 발생했어요.
                <br />({error.error.message})
              </div>
            )}
          >
            <FeedDetailComments postId={postId} />
          </ErrorBoundary>
        </DetailFeedCard.Body>
        <FeedDetailInput
          postId={postId}
          category={currentCategory?.category?.name ?? ''}
          tag={currentCategory?.tag?.name ?? '전체'}
          hasChildren={children.length > 0}
          onSubmitted={() => {
            queryClient.invalidateQueries({ queryKey: useGetPostsInfiniteQuery.getKey(categoryId) });
            requestAnimationFrame(() => {
              // MEMO(@jun): refecth 이후 render가 완료되기 전에 scroll 처리가 되어버려서, 리렌더링 이후에 실행하도록
              if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
              }
            });
          }}
        />
      </DetailFeedCard>
    </ReplyContext.Provider>
  );
};

export default FeedDetail;
