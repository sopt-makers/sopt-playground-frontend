import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconAlertTriangle, IconTrash } from '@sopt-makers/icons';
import { Flex } from '@toss/emotion-utils';
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
            commentId={comment.id}
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
                    <Flex align='center' css={{ gap: '10px' }}>
                      <IconTrash css={{ width: '16px', height: '16px' }} />
                      삭제
                    </Flex>
                  </FeedDropdown.Item>
                ) : null}
                {!comment.isMine ? (
                  <FeedDropdown.Item onClick={() => handleReportComment({ commentId: `${comment.id}` })}>
                    <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                      <IconAlertTriangle css={{ width: '16px', height: '16px' }} />
                      신고
                    </Flex>
                  </FeedDropdown.Item>
                ) : null}
              </FeedDropdown>
            }
          />
        ) : comment.member ? (
          <DetailFeedCard.Comment
            key={comment.id}
            commentId={comment.id}
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
                    <Flex align='center' css={{ gap: '10px' }}>
                      <IconTrash css={{ width: '16px', height: '16px' }} />
                      삭제
                    </Flex>
                  </FeedDropdown.Item>
                ) : null}
                {!comment.isMine ? (
                  <FeedDropdown.Item type='danger' onClick={() => handleReportComment({ commentId: `${comment.id}` })}>
                    <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                      <IconAlertTriangle css={{ width: '16px', height: '16px' }} />
                      신고
                    </Flex>
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
