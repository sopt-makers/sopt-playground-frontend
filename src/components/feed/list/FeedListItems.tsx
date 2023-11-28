import { Flex } from '@toss/emotion-utils';
import { FC, ReactNode } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import Loading from '@/components/common/Loading';
import useToast from '@/components/common/Toast/useToast';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import { useDeleteFeed } from '@/components/feed/common/hooks/useDeleteFeed';
import { useReportFeed } from '@/components/feed/common/hooks/useReportFeed';
import { useShareFeed } from '@/components/feed/common/hooks/useShareFeed';
import { getMemberInfo } from '@/components/feed/common/utils';
import FeedCard from '@/components/feed/list/FeedCard';

interface FeedListItemsProps {
  categoryId: string | undefined;
  renderFeedDetailLink: (props: { children: ReactNode; feedId: string }) => ReactNode;
}

const FeedListItems: FC<FeedListItemsProps> = ({ categoryId, renderFeedDetailLink }) => {
  const { data, refetch, fetchNextPage, isLoading, isError } = useGetPostsInfiniteQuery({
    categoryId,
  });

  const { handleShareFeed } = useShareFeed();
  const { handleDeleteFeed } = useDeleteFeed();
  const { handleReport } = useReportFeed();

  const flattenData = data?.pages.flatMap((page) => page.posts) ?? [];
  const toast = useToast();

  return (
    <>
      <Virtuoso
        data={flattenData}
        useWindowScroll
        endReached={() => {
          fetchNextPage();
        }}
        itemContent={(_, post) => {
          return renderFeedDetailLink({
            feedId: `${post.id}`,
            children: (
              <FeedCard
                name={post.member?.name ?? '익명'}
                title={post.title}
                content={post.content}
                profileImage={post.member?.profileImage ?? null}
                createdAt={post.createdAt}
                commentLength={post.commentCount}
                hits={post.hits}
                isBlindWriter={post.isBlindWriter}
                isQuestion={post.isQuestion}
                info={getMemberInfo({
                  categoryId: post.categoryId,
                  categoryName: post.categoryName,
                  member: {
                    activity: post.member?.activity ?? { generation: 0, part: '' },
                    careers: post.member?.careers ?? null,
                  },
                })}
                rightIcon={
                  <FeedDropdown
                    trigger={
                      <Flex as='button'>
                        <FeedCard.Icon name='moreHorizon' />
                      </Flex>
                    }
                  >
                    {post.isMine ? (
                      <FeedDropdown.Item
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.show({ message: '아직 지원하지 않는 기능이에요.' });
                        }}
                      >
                        수정
                      </FeedDropdown.Item>
                    ) : null}
                    <FeedDropdown.Item
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareFeed(`${post.id}`);
                      }}
                    >
                      공유
                    </FeedDropdown.Item>
                    {post.isMine ? (
                      <FeedDropdown.Item
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFeed({
                            postId: `${post.id}`,
                            onSuccess: () => {
                              refetch();
                            },
                          });
                        }}
                        type='danger'
                      >
                        삭제
                      </FeedDropdown.Item>
                    ) : null}
                    {!post.isMine ? (
                      <FeedDropdown.Item
                        type='danger'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReport({ postId: `${post.id}` });
                        }}
                      >
                        신고
                      </FeedDropdown.Item>
                    ) : null}
                  </FeedDropdown>
                }
              >
                {post.images.length !== 0 && (
                  <FeedCard.Image>
                    {post.images.map((image, index) => (
                      <FeedCard.ImageItem key={`${image}-${index}`} src={image} />
                    ))}
                  </FeedCard.Image>
                )}
                {post.comments.length !== 0 && (
                  <FeedCard.Comment>
                    {post.comments.map((comment) =>
                      comment.isBlindWriter ? (
                        <FeedCard.CommentItem
                          key={comment.id}
                          comment={comment.content}
                          isBlindWriter={comment.isBlindWriter}
                        />
                      ) : comment.member ? (
                        <FeedCard.CommentItem
                          key={comment.id}
                          comment={comment.content}
                          isBlindWriter={comment.isBlindWriter}
                          name={comment.member.name}
                        />
                      ) : null,
                    )}
                  </FeedCard.Comment>
                )}
              </FeedCard>
            ),
          });
        }}
      />
      <div css={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
        {isError ? <div>오류가 발생했어요.</div> : null}
        {data != null && flattenData.length === 0 ? <div>글이 없어요!</div> : null}
        {isLoading ? <Loading /> : null}
      </div>
    </>
  );
};

export default FeedListItems;
