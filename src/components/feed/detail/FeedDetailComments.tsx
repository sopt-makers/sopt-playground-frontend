import styled from '@emotion/styled';
import { FC } from 'react';

import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { useGetPostQuery } from '@/api/endpoint/feed/getPost';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import { useDeleteComment } from '@/components/feed/common/hooks/useDeleteComment';
import { useReportComment } from '@/components/feed/common/hooks/useReportComment';
import { getMemberInfo } from '@/components/feed/common/utils';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';

interface FeedDetailCommentsProps {
  postId: string;
}

const FeedDetailComments: FC<FeedDetailCommentsProps> = ({ postId }) => {
  const { data: commentData, refetch: refetchCommentQuery } = useGetCommentQuery(postId);
  const { handleDeleteComment } = useDeleteComment();
  const { handleReport: handleReportComment } = useReportComment();
  const { data: postData } = useGetPostQuery(postId);

  if (commentData == null || postData == null) {
    return null;
  }

  return (
    <Container>
      {commentData.map((comment) =>
        comment.isBlindWriter ? (
          <DetailFeedCard.Comment
            key={comment.id}
            comment={comment.content}
            isBlindWriter={comment.isBlindWriter}
            anonymousProfile={comment.anonymousProfile}
            createdAt={comment.createdAt}
            moreIcon={
              <FeedDropdown
                trigger={
                  <button>
                    <DetailFeedCard.Icon name='moreHorizontal' />
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
                {!comment.isMine ? (
                  <FeedDropdown.Item type='danger' onClick={() => handleReportComment({ commentId: `${comment.id}` })}>
                    신고
                  </FeedDropdown.Item>
                ) : null}
              </FeedDropdown>
            }
          />
        ) : comment.member ? (
          <DetailFeedCard.Comment
            key={comment.id}
            name={comment.member.name}
            profileImage={comment.member.profileImage}
            memberId={comment.member.id}
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
                    <DetailFeedCard.Icon name='moreHorizontal' />
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
                {!comment.isMine ? (
                  <FeedDropdown.Item type='danger' onClick={() => handleReportComment({ commentId: `${comment.id}` })}>
                    신고
                  </FeedDropdown.Item>
                ) : null}
              </FeedDropdown>
            }
          />
        ) : null,
      )}
    </Container>
  );
};

export default FeedDetailComments;

const Container = styled.div`
  flex: 1;
  margin-top: 8px;
  padding-bottom: 120px;
  white-space: pre-wrap;
`;
