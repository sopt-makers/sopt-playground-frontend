import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useQuery } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import { useDeleteFeed } from '@/components/feed/common/hooks/useDeleteFeed';
import { useShareFeed } from '@/components/feed/common/hooks/useShareFeed';
import { useCategoryParam } from '@/components/feed/common/queryParam';
import { getMemberInfo } from '@/components/feed/common/utils';
import CategorySelect from '@/components/feed/list/CategorySelect';
import FeedCard from '@/components/feed/list/FeedCard';
import { layoutCSSVariable } from '@/components/layout/utils';

interface FeedListProps {
  renderFeedDetailLink: (props: { children: ReactNode; feedId: string }) => ReactNode;
}

const FeedList: FC<FeedListProps> = ({ renderFeedDetailLink }) => {
  const [categoryId] = useCategoryParam({ defaultValue: '' });
  const { data: meData } = useGetMemberOfMe();
  const { data, refetch, fetchNextPage } = useGetPostsInfiniteQuery({ categoryId });
  const { data: categoryData } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });
  const { handleShareFeed } = useShareFeed();
  const { handleDeleteFeed } = useDeleteFeed();

  const categories = categoryData?.map((category) => ({
    id: `${category.id}`,
    name: category.name,
    hasAllCategory: true,
    tags: category.children.map((item) => ({
      id: `${item.id}`,
      name: item.name,
    })),
  }));

  return (
    <Container>
      <CategoryArea>{categories && <CategorySelect categories={categories} />}</CategoryArea>
      <Virtuoso
        data={data?.pages.flatMap((page) => page.posts) ?? []}
        useWindowScroll
        endReached={() => {
          fetchNextPage();
        }}
        itemContent={(_, post) => {
          const is내글여부 = post.writerId === meData?.id;
          return renderFeedDetailLink({
            feedId: `${post.id}`,
            children: (
              <FeedCard
                name={post.member.name}
                title={post.title}
                content={post.content}
                profileImage={post.member.profileImage}
                createdAt={post.createdAt}
                commentLength={post.commentCount}
                hits={post.hits}
                isBlindWriter={post.isBlindWriter}
                isQuestion={post.isQuestion}
                info={getMemberInfo({
                  categoryId: post.categoryId,
                  categoryName: post.categoryName,
                  member: {
                    activity: post.member.activity,
                    careers: post.member.careers,
                  },
                })}
                rightIcon={
                  <FeedDropdown
                    trigger={
                      <button>
                        <FeedCard.Icon name='moreHorizon' />
                      </button>
                    }
                  >
                    {is내글여부 ? <FeedDropdown.Item>수정</FeedDropdown.Item> : null}
                    <FeedDropdown.Item
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareFeed(`${post.id}`);
                      }}
                    >
                      공유
                    </FeedDropdown.Item>
                    {is내글여부 ? (
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
                    <FeedDropdown.Item type='danger'>신고</FeedDropdown.Item>
                  </FeedDropdown>
                }
              >
                <FeedCard.Image>
                  {post.images.map((image, index) => (
                    <FeedCard.ImageItem key={`${image}-${index}`} src={image} />
                  ))}
                </FeedCard.Image>
                <FeedCard.Comment>
                  {post.comments.map((comment) => (
                    <FeedCard.CommentItem
                      key={comment.id}
                      comment={comment.content}
                      name={comment.member.name}
                      isBlindWriter={comment.isBlindWriter}
                    />
                  ))}
                </FeedCard.Comment>
              </FeedCard>
            ),
          });
        }}
      />
    </Container>
  );
};

export default FeedList;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const CategoryArea = styled.div`
  position: sticky;
  top: ${layoutCSSVariable.globalHeaderHeight};
  z-index: 1; /* Virtuoso가 sticky 위에 와버리는 문제때문에 z-index로 제어 */
  background-color: ${colors.background};
`;
