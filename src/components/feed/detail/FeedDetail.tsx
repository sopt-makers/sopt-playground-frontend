import { useQueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from '@toss/error-boundary';
import React, { ReactNode, useRef, useState } from 'react';
import { atomFamily, useRecoilState } from 'recoil';

import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { usePostCommentMutation } from '@/api/endpoint/feed/postComment';
import useToast from '@/components/common/Toast/useToast';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import { useCategoryInfo } from '@/components/feed/common/hooks/useCurrentCategory';
import { useDeleteFeed } from '@/components/feed/common/hooks/useDeleteFeed';
import { useReportFeed } from '@/components/feed/common/hooks/useReportFeed';
import { useShareFeed } from '@/components/feed/common/hooks/useShareFeed';
import { useCategoryParam } from '@/components/feed/common/queryParam';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';
import FeedDetailComments from '@/components/feed/detail/FeedDetailComments';
import FeedDetailContent from '@/components/feed/detail/FeedDetailContent';

interface FeedDetailProps {
  postId: string;
  renderCategoryLink: (props: { children: ReactNode; categoryId: string }) => ReactNode;
  renderBackLink: (props: { children: ReactNode }) => ReactNode;
}

const commentAtomFamily = atomFamily({
  key: 'commentAtomFamily',
  default: '',
});

const FeedDetail = ({ postId, renderCategoryLink, renderBackLink }: FeedDetailProps) => {
  const [value, setValue] = useRecoilState(commentAtomFamily(postId));
  const [isBlindWriter, setIsBlindWriter] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  const { handleShareFeed } = useShareFeed();
  const { handleDeleteFeed } = useDeleteFeed();
  const { handleReport: handleReportFeed } = useReportFeed();
  const { data: postData } = useGetPostQuery(postId);
  const { data: commentData, refetch: refetchCommentQuery } = useGetCommentQuery(postId);
  const { mutate: postComment } = usePostCommentMutation(postId);
  const currentCategory = useCategoryInfo(postData?.posts.categoryId.toString());
  const containerRef = useRef<HTMLDivElement>(null);
  const [categoryId] = useCategoryParam();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postComment(
      {
        content: value,
        isBlindWriter,
        isChildComment: false,
      },
      {
        onSuccess: async () => {
          setValue('');
          const { isSuccess } = await refetchCommentQuery();
          queryClient.invalidateQueries({ queryKey: useGetPostsInfiniteQuery.getKey(categoryId) });
          requestAnimationFrame(() => {
            // MEMO(@jun): refecth 이후 render가 완료되기 전에 scroll 처리가 되어버려서, 리렌더링 이후에 실행하도록
            if (isSuccess && containerRef.current) {
              containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
          });
        },
      },
    );
  };

  if (postData == null || commentData == null) {
    return null;
  }

  return (
    <DetailFeedCard>
      <DetailFeedCard.Header
        category={currentCategory?.category?.name ?? ''}
        tag={currentCategory?.tag?.name ?? '전체'}
        categoryId={postData.posts.categoryId.toString()}
        renderCategoryLink={renderCategoryLink}
        left={renderBackLink({
          children: <DetailFeedCard.Icon name='chevronLeft' />,
        })}
        right={
          <>
            <button onClick={() => handleShareFeed(postId)}>
              <DetailFeedCard.Icon name='share' />
            </button>
            <FeedDropdown
              trigger={
                <button>
                  <DetailFeedCard.Icon name='moreVertical' />
                </button>
              }
            >
              {postData.isMine ? (
                <FeedDropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.show({ message: '아직 지원하지 않는 기능이에요.' });
                  }}
                >
                  수정
                </FeedDropdown.Item>
              ) : null}
              {postData.isMine ? (
                <FeedDropdown.Item
                  type='danger'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFeed({ postId });
                  }}
                >
                  삭제
                </FeedDropdown.Item>
              ) : null}
              <FeedDropdown.Item
                type='danger'
                onClick={(e) => {
                  e.stopPropagation();
                  handleReportFeed({ postId });
                }}
              >
                신고
              </FeedDropdown.Item>
            </FeedDropdown>
          </>
        }
      />
      <DetailFeedCard.Body ref={containerRef}>
        <ErrorBoundary renderFallback={() => <div>글을 보여주는 데 문제가 발생했어요.</div>}>
          <FeedDetailContent postId={postId} />
        </ErrorBoundary>
        <DetailFeedCard.Divider />
        <ErrorBoundary renderFallback={() => <div>댓글을 보여주는 데 문제가 발생했어요.</div>}>
          <FeedDetailComments postId={postId} />
        </ErrorBoundary>
      </DetailFeedCard.Body>
      <form onSubmit={handleSubmit}>
        <DetailFeedCard.Input
          value={value}
          onChange={setValue}
          isBlindChecked={isBlindWriter}
          onChangeIsBlindChecked={setIsBlindWriter}
        />
      </form>
    </DetailFeedCard>
  );
};

export default FeedDetail;
