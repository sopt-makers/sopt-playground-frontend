import { colors } from '@sopt-makers/colors';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import React, { useRef, useState } from 'react';

import { useDeleteCommentMutation } from '@/api/endpoint/feed/deleteComment';
import { useDeletePostMutation } from '@/api/endpoint/feed/deletePost';
import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { getPosts } from '@/api/endpoint/feed/getPosts';
import { usePostCommentMutation } from '@/api/endpoint/feed/postComment';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import useAlert from '@/components/common/Modal/useAlert';
import useConfirm from '@/components/common/Modal/useConfirm';
import useToast from '@/components/common/Toast/useToast';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import { getMemberInfo } from '@/components/feed/common/utils';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';
import { useCopyText } from '@/hooks/useCopyText';

interface FeedDetailProps {
  postId: string;
}

const FeedDetail = ({ postId }: FeedDetailProps) => {
  const { data: meData } = useGetMemberOfMe();
  const { data: postData } = useGetPostQuery(postId);
  const { data: commentData, refetch: refetchCommentQuery } = useGetCommentQuery(postId);
  const { mutate: postComment } = usePostCommentMutation(postId);
  const { mutate: deletePost } = useDeletePostMutation();
  const { mutate: deleteComment } = useDeleteCommentMutation();
  const { alert } = useAlert();
  const { confirm } = useConfirm();
  const { copy } = useCopyText();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [value, setValue] = useState<string>('');
  const [isBlindWriter, setIsBlindWriter] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
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

  const handleShare = () => {
    if (typeof window === 'undefined') {
      return;
    }
    copy(`${window.location.origin}${window.location.pathname}${playgroundLink.feedDetail(postId)}`, {
      successMessage: '링크가 복사되었어요.',
    });
  };

  const handleDelete = async () => {
    const result = await confirm({
      title: '글을 정말 삭제하시겠어요?',
      description: '유익한 정보를 담고 있다면, 글을 남겨 다른 사람들과도 공유해보세요.',
      okButtonColor: colors.error,
      okButtonTextColor: colors.white,
      okButtonText: '삭제하기',
      cancelButtonText: '취소',
    });

    if (result) {
      deletePost(postId, {
        onSuccess: () => {
          toast.show({
            message: '글이 성공적으로 삭제되었어요.',
          });
          router.push(playgroundLink.feedList());
          queryClient.invalidateQueries({
            queryKey: getPosts.cacheKey(),
          });
        },
      });
    }
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
        category='저는 하드코딩 되어있습니다 ㅎㅎㅎ'
        tag='태그좀 넣어주세요 감사합니당 ㅎㅎ'
        icons={
          <>
            <button onClick={handleShare}>
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
                <FeedDropdown.Item type='danger' onClick={handleDelete}>
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
