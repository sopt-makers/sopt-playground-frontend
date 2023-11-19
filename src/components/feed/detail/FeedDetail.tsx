import { colors } from '@sopt-makers/colors';
import React, { useRef, useState } from 'react';

import { useDeleteCommentMutation } from '@/api/endpoint/feed/deleteComment';
import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { usePostCommentMutation } from '@/api/endpoint/feed/postComment';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import useConfirm from '@/components/common/Modal/useConfirm';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import { getMemberInfo } from '@/components/feed/common/utils';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';

interface FeedDetailProps {
  postId: string;
}

const FeedDetail = ({ postId }: FeedDetailProps) => {
  const { data: meData } = useGetMemberOfMe();
  const { data: postData } = useGetPostQuery(postId);
  const { data: commentData, refetch: refetchCommentQuery } = useGetCommentQuery(postId);
  const { mutate: postComment } = usePostCommentMutation(postId);
  const { mutate: deleteComment } = useDeleteCommentMutation();
  const { confirm } = useConfirm();

  const [value, setValue] = useState<string>('');
  const [isBlindWriter, setIsBlindWriter] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleDeleteComment = async (commentId: string) => {
    const result = await confirm({
      title: '댓글을 정말 삭제하시겠어요?',
      description: '유익한 정보를 담고 있다면, 글을 남겨 다른 사람들과도 공유해보세요.',
      okButtonColor: colors.error,
      okButtonTextColor: colors.white,
      okButtonText: '삭제하기',
      cancelButtonText: '취소',
    });

    if (result) {
      deleteComment(commentId, {
        onSuccess: () => {
          refetchCommentQuery();
        },
      });
    }
  };

  if (postData == null || commentData == null) {
    return null;
  }

  return (
    <DetailFeedCard>
      {/* TODO: 하드코딩 제거 */}
      <DetailFeedCard.Header
        category='파트'
        tag='기획'
        icons={
          <>
            <button>
              <DetailFeedCard.Icon name='share' />
            </button>
            <FeedDropdown
              trigger={
                <button>
                  <DetailFeedCard.Icon name='moreVertical' />
                </button>
              }
            >
              <FeedDropdown.Item>수정</FeedDropdown.Item>
              <FeedDropdown.Item type='danger'>삭제</FeedDropdown.Item>
              <FeedDropdown.Item type='danger'>신고</FeedDropdown.Item>
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
                  <FeedDropdown.Item type='danger' onClick={() => handleDeleteComment(`${comment.id}`)}>
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
