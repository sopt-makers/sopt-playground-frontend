import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconAlertTriangle, IconTrash } from '@sopt-makers/icons';
import { Flex } from '@toss/emotion-utils';
import { FC } from 'react';
import { z } from 'zod';

import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { recursiveCommentSchema } from '@/api/endpoint/feed/getComment';
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

  const hasReplies = (comment: z.infer<typeof recursiveCommentSchema>) => {
    return comment.replies.length > 0 && !comment.replies.every((reply) => reply.isDeleted === true);
  };

  return (
    <Container>
      {commentData.map((comment) =>
        comment.isBlindWriter ? (
          <div key={comment.id}>
            <DetailFeedCard.Comment
              key={comment.id}
              parentCommentId={comment.parentCommentId}
              postId={postId}
              commentId={comment.id}
              comment={comment.content}
              isBlindWriter={comment.isBlindWriter}
              anonymousProfile={comment.anonymousProfile}
              createdAt={comment.createdAt}
              isLiked={comment.isLiked}
              commentLikeCount={comment.likeCount}
              isDeleted={comment.isDeleted}
              hasReplies={hasReplies(comment)}
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
                    <FeedDropdown.Item
                      onClick={() => handleReportComment({ commentId: `${comment.id}`, postId: postId })}
                    >
                      <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                        <IconAlertTriangle css={{ width: '16px', height: '16px' }} />
                        신고
                      </Flex>
                    </FeedDropdown.Item>
                  ) : null}
                </FeedDropdown>
              }
            />

            {comment.replies.length > 0 &&
              comment.replies.map((replyComment) =>
                replyComment.isBlindWriter ? (
                  <DetailFeedCard.Comment
                    parentCommentId={replyComment.parentCommentId}
                    commentId={replyComment.id}
                    key={replyComment.id}
                    comment={replyComment.content}
                    isBlindWriter={replyComment.isBlindWriter}
                    anonymousProfile={replyComment.anonymousProfile}
                    createdAt={replyComment.createdAt}
                    isDeleted={replyComment.isDeleted}
                    postId={postId}
                    isLiked={replyComment.isLiked}
                    commentLikeCount={replyComment.likeCount}
                    isReply={true}
                    hasReplies={false}
                    moreIcon={
                      <FeedDropdown
                        trigger={
                          <button>
                            <DetailFeedCard.Icon name='moreHorizontal' />
                          </button>
                        }
                      >
                        {replyComment.isMine ? (
                          <FeedDropdown.Item
                            type='danger'
                            onClick={() =>
                              handleDeleteComment({
                                commentId: `${replyComment.id}`,
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
                          <FeedDropdown.Item
                            onClick={() => handleReportComment({ commentId: `${comment.id}`, postId: postId })}
                          >
                            <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                              <IconAlertTriangle css={{ width: '16px', height: '16px' }} />
                              신고
                            </Flex>
                          </FeedDropdown.Item>
                        ) : null}
                      </FeedDropdown>
                    }
                  />
                ) : replyComment.member ? (
                  <DetailFeedCard.Comment
                    parentCommentId={replyComment.parentCommentId}
                    key={replyComment.id}
                    postId={postId}
                    commentId={replyComment.id}
                    name={replyComment.member.name}
                    profileImage={replyComment.member.profileImage}
                    memberId={replyComment.member.id}
                    isDeleted={replyComment.isDeleted}
                    info={getMemberInfo({
                      member: replyComment.member,
                      categoryId: postData.category.id,
                      categoryName: postData.category.name,
                    })}
                    comment={replyComment.content}
                    isBlindWriter={replyComment.isBlindWriter}
                    createdAt={replyComment.createdAt}
                    isLiked={replyComment.isLiked}
                    commentLikeCount={replyComment.likeCount}
                    isReply={true}
                    hasReplies={false}
                    moreIcon={
                      <FeedDropdown
                        trigger={
                          <button>
                            <DetailFeedCard.Icon name='moreHorizontal' />
                          </button>
                        }
                      >
                        {replyComment.isMine ? (
                          <FeedDropdown.Item
                            type='danger'
                            onClick={() =>
                              handleDeleteComment({
                                commentId: `${replyComment.id}`,
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
                        {!replyComment.isMine ? (
                          <FeedDropdown.Item
                            type='danger'
                            onClick={() => handleReportComment({ commentId: `${replyComment.id}`, postId: postId })}
                          >
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
          </div>
        ) : comment.member ? (
          <div key={comment.id}>
            <DetailFeedCard.Comment
              key={comment.id}
              parentCommentId={comment.parentCommentId}
              postId={postId}
              commentId={comment.id}
              comment={comment.content}
              name={comment.member.name}
              profileImage={comment.member.profileImage}
              memberId={comment.member.id}
              info={getMemberInfo({
                member: comment.member,
                categoryId: postData.category.id,
                categoryName: postData.category.name,
              })}
              isBlindWriter={comment.isBlindWriter}
              isLiked={comment.isLiked}
              commentLikeCount={comment.likeCount}
              createdAt={comment.createdAt}
              isDeleted={comment.isDeleted}
              hasReplies={hasReplies(comment)}
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
                    <FeedDropdown.Item
                      type='danger'
                      onClick={() => handleReportComment({ commentId: `${comment.id}`, postId: postId })}
                    >
                      <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                        <IconAlertTriangle css={{ width: '16px', height: '16px' }} />
                        신고
                      </Flex>
                    </FeedDropdown.Item>
                  ) : null}
                </FeedDropdown>
              }
            />
            {comment.replies.length > 0 &&
              comment.replies.map((replyComment) =>
                replyComment.isBlindWriter ? (
                  <DetailFeedCard.Comment
                    parentCommentId={replyComment.parentCommentId}
                    commentId={replyComment.id}
                    key={replyComment.id}
                    comment={replyComment.content}
                    isBlindWriter={replyComment.isBlindWriter}
                    anonymousProfile={replyComment.anonymousProfile}
                    createdAt={replyComment.createdAt}
                    isDeleted={replyComment.isDeleted}
                    postId={postId}
                    isLiked={replyComment.isLiked}
                    commentLikeCount={replyComment.likeCount}
                    isReply={true}
                    hasReplies={false}
                    moreIcon={
                      <FeedDropdown
                        trigger={
                          <button>
                            <DetailFeedCard.Icon name='moreHorizontal' />
                          </button>
                        }
                      >
                        {replyComment.isMine ? (
                          <FeedDropdown.Item
                            type='danger'
                            onClick={() =>
                              handleDeleteComment({
                                commentId: `${replyComment.id}`,
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
                        {!replyComment.isMine ? (
                          <FeedDropdown.Item
                            onClick={() => handleReportComment({ commentId: `${replyComment.id}`, postId: postId })}
                          >
                            <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                              <IconAlertTriangle css={{ width: '16px', height: '16px' }} />
                              신고
                            </Flex>
                          </FeedDropdown.Item>
                        ) : null}
                      </FeedDropdown>
                    }
                  />
                ) : replyComment.member ? (
                  <DetailFeedCard.Comment
                    parentCommentId={replyComment.parentCommentId}
                    key={replyComment.id}
                    postId={postId}
                    commentId={replyComment.id}
                    name={replyComment.member.name}
                    profileImage={replyComment.member.profileImage}
                    memberId={replyComment.member.id}
                    isDeleted={replyComment.isDeleted}
                    info={getMemberInfo({
                      member: replyComment.member,
                      categoryId: postData.category.id,
                      categoryName: postData.category.name,
                    })}
                    comment={replyComment.content}
                    isBlindWriter={replyComment.isBlindWriter}
                    createdAt={replyComment.createdAt}
                    isLiked={replyComment.isLiked}
                    commentLikeCount={replyComment.likeCount}
                    isReply={true}
                    hasReplies={false}
                    moreIcon={
                      <FeedDropdown
                        trigger={
                          <button>
                            <DetailFeedCard.Icon name='moreHorizontal' />
                          </button>
                        }
                      >
                        {replyComment.isMine ? (
                          <FeedDropdown.Item
                            type='danger'
                            onClick={() =>
                              handleDeleteComment({
                                commentId: `${replyComment.id}`,
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
                        {!replyComment.isMine ? (
                          <FeedDropdown.Item
                            type='danger'
                            onClick={() => handleReportComment({ commentId: `${replyComment.id}`, postId: postId })}
                          >
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
          </div>
        ) : comment.isDeleted && hasReplies(comment) ? (
          <div key={comment.id}>
            <DetailFeedCard.Comment
              key={comment.id}
              parentCommentId={comment.parentCommentId}
              postId={postId}
              commentId={comment.id}
              isLiked={comment.isLiked ?? false}
              commentLikeCount={comment.likeCount ?? 0}
              comment={comment.content ?? ''}
              createdAt={comment.createdAt ?? ''}
              isDeleted={comment.isDeleted}
              hasReplies={hasReplies(comment)}
            />
            {comment.replies.length > 0 &&
              comment.replies.map((replyComment) =>
                replyComment.isBlindWriter ? (
                  <DetailFeedCard.Comment
                    parentCommentId={replyComment.parentCommentId}
                    commentId={replyComment.id}
                    key={replyComment.id}
                    comment={replyComment.content}
                    isBlindWriter={replyComment.isBlindWriter}
                    anonymousProfile={replyComment.anonymousProfile}
                    createdAt={replyComment.createdAt}
                    isDeleted={replyComment.isDeleted}
                    postId={postId}
                    isLiked={replyComment.isLiked}
                    commentLikeCount={replyComment.likeCount}
                    isReply={true}
                    hasReplies={false}
                    moreIcon={
                      <FeedDropdown
                        trigger={
                          <button>
                            <DetailFeedCard.Icon name='moreHorizontal' />
                          </button>
                        }
                      >
                        {replyComment.isMine ? (
                          <FeedDropdown.Item
                            type='danger'
                            onClick={() =>
                              handleDeleteComment({
                                commentId: `${replyComment.id}`,
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
                        {!replyComment.isMine ? (
                          <FeedDropdown.Item
                            onClick={() => handleReportComment({ commentId: `${replyComment.id}`, postId: postId })}
                          >
                            <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                              <IconAlertTriangle css={{ width: '16px', height: '16px' }} />
                              신고
                            </Flex>
                          </FeedDropdown.Item>
                        ) : null}
                      </FeedDropdown>
                    }
                  />
                ) : replyComment.member ? (
                  <DetailFeedCard.Comment
                    parentCommentId={replyComment.parentCommentId}
                    key={replyComment.id}
                    postId={postId}
                    commentId={replyComment.id}
                    name={replyComment.member.name}
                    profileImage={replyComment.member.profileImage}
                    memberId={replyComment.member.id}
                    isDeleted={replyComment.isDeleted}
                    info={getMemberInfo({
                      member: replyComment.member,
                      categoryId: postData.category.id,
                      categoryName: postData.category.name,
                    })}
                    comment={replyComment.content}
                    isBlindWriter={replyComment.isBlindWriter}
                    createdAt={replyComment.createdAt}
                    isLiked={replyComment.isLiked}
                    commentLikeCount={replyComment.likeCount}
                    isReply={true}
                    hasReplies={false}
                    moreIcon={
                      <FeedDropdown
                        trigger={
                          <button>
                            <DetailFeedCard.Icon name='moreHorizontal' />
                          </button>
                        }
                      >
                        {replyComment.isMine ? (
                          <FeedDropdown.Item
                            type='danger'
                            onClick={() =>
                              handleDeleteComment({
                                commentId: `${replyComment.id}`,
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
                        {!replyComment.isMine ? (
                          <FeedDropdown.Item
                            type='danger'
                            onClick={() => handleReportComment({ commentId: `${replyComment.id}`, postId: postId })}
                          >
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
          </div>
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
