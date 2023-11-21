import { useQueryClient } from '@tanstack/react-query';
import React, { ReactNode, useRef, useState } from 'react';

import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { usePostCommentMutation } from '@/api/endpoint/feed/postComment';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import useAlert from '@/components/common/Modal/useAlert';
import useConfirm from '@/components/common/Modal/useConfirm';
import useToast from '@/components/common/Toast/useToast';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import { useCategoryInfo } from '@/components/feed/common/hooks/useCurrentCategory';
import { useDeleteComment } from '@/components/feed/common/hooks/useDeleteComment';
import { useDeleteFeed } from '@/components/feed/common/hooks/useDeleteFeed';
import { useShareFeed } from '@/components/feed/common/hooks/useShareFeed';
import { FeedDetailLink, useCategoryParam } from '@/components/feed/common/queryParam';
import { getMemberInfo } from '@/components/feed/common/utils';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';

interface FeedDetailProps {
  postId: string;
  renderCategoryLink: (props: { children: ReactNode; categoryId: string }) => ReactNode;
}

const FeedDetail = ({ postId, renderCategoryLink }: FeedDetailProps) => {
  const [value, setValue] = useState<string>('');
  const [isBlindWriter, setIsBlindWriter] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  const { alert } = useAlert();
  const { confirm } = useConfirm();
  const { handleShareFeed } = useShareFeed();
  const { handleDeleteComment } = useDeleteComment();
  const { handleDeleteFeed } = useDeleteFeed();
  const { data: meData } = useGetMemberOfMe();
  const { data: postData } = useGetPostQuery(postId);
  const { data: commentData, refetch: refetchCommentQuery } = useGetCommentQuery(postId);
  const { mutate: postComment } = usePostCommentMutation(postId);
  const currentCategory = useCategoryInfo(postData?.posts.categoryId.toString());
  const containerRef = useRef<HTMLDivElement>(null);
  const [categoryId] = useCategoryParam();

  const is내글여부 = meData?.id === postData?.member.id;

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

  const handleReport = async () => {
    const result = await confirm({
      title: '이 글을 신고하시겠습니까?',
      description: '글을 신고할 경우, 메이커스에서 검토를 거쳐 적절한 조치 및 게시자 제재를 취해요.',
      okButtonText: '신고하기',
      cancelButtonText: '취소',
    });

    if (result) {
      // TODO: 신고하기 api 작성되면 추가
      // onSuccess로 이동
      alert({
        title: '신고해주셔서 감사해요.',
        description:
          '메이커스에서 빠르게 검토 후 적절한 조치를 취할게요 :) 건전한 커뮤니티를 만드는데 기여해주셔서 감사해요!',
      });
    }
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
        left={
          <FeedDetailLink feedId={undefined}>
            <DetailFeedCard.Icon name='chevronLeft' />
          </FeedDetailLink>
        }
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
              {is내글여부 ? (
                <FeedDropdown.Item onClick={() => toast.show({ message: '아직 지원하지 않는 기능이에요.' })}>
                  수정
                </FeedDropdown.Item>
              ) : null}
              {is내글여부 ? (
                <FeedDropdown.Item type='danger' onClick={() => handleDeleteFeed({ postId })}>
                  삭제
                </FeedDropdown.Item>
              ) : null}
              <FeedDropdown.Item type='danger' onClick={handleReport}>
                신고
              </FeedDropdown.Item>
            </FeedDropdown>
          </>
        }
      />
      <DetailFeedCard.Body ref={containerRef}>
        <DetailFeedCard.Main>
          <DetailFeedCard.Top
            name={postData.member.name}
            profileImage={postData.member.profileImage}
            info={getMemberInfo({
              categoryId: postData.category.id,
              categoryName: postData.category.name,
              member: postData.member,
            })}
            createdAt={postData.posts.createdAt}
          />
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
        {commentData.map((comment) => (
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
                {comment.member.id === meData?.id ? (
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
        ))}
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
