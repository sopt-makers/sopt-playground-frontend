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
    <>
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
                <FeedDropdown.Item type='danger' onClick={() => handleReportComment({ commentId: `${comment.id}` })}>
                  신고
                </FeedDropdown.Item>
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
                <FeedDropdown.Item type='danger' onClick={() => handleReportComment({ commentId: `${comment.id}` })}>
                  신고
                </FeedDropdown.Item>
              </FeedDropdown>
            }
          />
        ) : null,
      )}
    </>
  );
};

export default FeedDetailComments;