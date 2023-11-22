import { useQueryClient } from '@tanstack/react-query';
import React, { ReactNode, useRef, useState } from 'react';

import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { usePostCommentMutation } from '@/api/endpoint/feed/postComment';
import useToast from '@/components/common/Toast/useToast';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import { useCategoryInfo } from '@/components/feed/common/hooks/useCurrentCategory';
import { useDeleteComment } from '@/components/feed/common/hooks/useDeleteComment';
import { useDeleteFeed } from '@/components/feed/common/hooks/useDeleteFeed';
import { useReportFeed } from '@/components/feed/common/hooks/useReportFeed';
import { useShareFeed } from '@/components/feed/common/hooks/useShareFeed';
import { useCategoryParam } from '@/components/feed/common/queryParam';
import { getMemberInfo } from '@/components/feed/common/utils';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';

interface FeedDetailProps {
  postId: string;
  renderCategoryLink: (props: { children: ReactNode; categoryId: string }) => ReactNode;
  renderBackLink: (props: { children: ReactNode }) => ReactNode;
}

const FeedDetail = ({ postId, renderCategoryLink, renderBackLink }: FeedDetailProps) => {
  const [value, setValue] = useState<string>('');
  const [isBlindWriter, setIsBlindWriter] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  const { handleShareFeed } = useShareFeed();
  const { handleDeleteComment } = useDeleteComment();
  const { handleDeleteFeed } = useDeleteFeed();
  const { handleReport } = useReportFeed();
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
                  handleReport({ postId });
                }}
              >
                신고
              </FeedDropdown.Item>
            </FeedDropdown>
          </>
        }
      />
      <DetailFeedCard.Body ref={containerRef}>
        <DetailFeedCard.Main>
          {postData.posts.isBlindWriter ? (
            <DetailFeedCard.Top isBlindWriter={postData.posts.isBlindWriter} createdAt={postData.posts.createdAt} />
          ) : postData.member ? (
            <DetailFeedCard.Top
              isBlindWriter={postData.posts.isBlindWriter}
              name={postData.member.name}
              profileImage={postData.member.profileImage}
              info={getMemberInfo({
                categoryId: postData.category.id,
                categoryName: postData.category.name,
                member: postData.member,
              })}
              createdAt={postData.posts.createdAt}
            />
          ) : null}
          <DetailFeedCard.Content
            isQuestion
            title={postData.posts.title}
            hits={postData.posts.hits}
            commentLength={postData.posts.comments.length}
            content={postData.posts.content}
            images={postData.posts.images}
          />
        </DetailFeedCard.Main>
        <DetailFeedCard.Divider />
        {commentData.map((comment) =>
          comment.isBlindWriter ? (
            <DetailFeedCard.Comment
              key={comment.id}
              comment={comment.content}
              isBlindWriter={comment.isBlindWriter}
              createdAt={comment.createdAt}
              moreIcon={
                <FeedDropdown
                  trigger={
                    <button>
                      <DetailFeedCard.Icon name='moreHorizental' />
                    </button>
                  }
                >
                  {comment.isMine ? (
                    <FeedDropdown.Item
                      type='danger'
                      onClick={() =>
                        handleDeleteComment({
                          commentId: `${comment.id}`,
                          onSuccess: () => {
                            refetchCommentQuery();
                          },
                        })
                      }
                    >
                      삭제
                    </FeedDropdown.Item>
                  ) : null}
                  <FeedDropdown.Item type='danger'>신고</FeedDropdown.Item>
                </FeedDropdown>
              }
            />
          ) : comment.member ? (
            <DetailFeedCard.Comment
              key={comment.id}
              name={comment.member.name}
              profileImage={comment.member.profileImage}
              info={getMemberInfo({
                member: comment.member,
                categoryId: postData.category.id,
                categoryName: postData.category.name,
              })}
              comment={comment.content}
              isBlindWriter={comment.isBlindWriter}
              createdAt={comment.createdAt}
              moreIcon={
                <FeedDropdown
                  trigger={
                    <button>
                      <DetailFeedCard.Icon name='moreHorizental' />
                    </button>
                  }
                >
                  {comment.isMine ? (
                    <FeedDropdown.Item
                      type='danger'
                      onClick={() =>
                        handleDeleteComment({
                          commentId: `${comment.id}`,
                          onSuccess: () => {
                            refetchCommentQuery();
                          },
                        })
                      }
                    >
                      삭제
                    </FeedDropdown.Item>
                  ) : null}
                  <FeedDropdown.Item type='danger'>신고</FeedDropdown.Item>
                </FeedDropdown>
              }
            />
          ) : null,
        )}
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
