import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import Loading from '@/components/common/Loading';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import { useDeleteFeed } from '@/components/feed/common/hooks/useDeleteFeed';
import { useReportFeed } from '@/components/feed/common/hooks/useReportFeed';
import { useShareFeed } from '@/components/feed/common/hooks/useShareFeed';
import { useCategoryParam } from '@/components/feed/common/queryParam';
import { getMemberInfo } from '@/components/feed/common/utils';
import CategorySelect from '@/components/feed/list/CategorySelect';
import FeedCard from '@/components/feed/list/FeedCard';
import { layoutCSSVariable } from '@/components/layout/utils';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface FeedListProps {
  renderFeedDetailLink: (props: { children: ReactNode; feedId: string }) => ReactNode;
}

const FeedList: FC<FeedListProps> = ({ renderFeedDetailLink }) => {
  const [categoryId] = useCategoryParam({ defaultValue: '' });
  const { data, refetch, fetchNextPage, isLoading, isError, error } = useGetPostsInfiniteQuery({
    categoryId,
  });
  const { data: categoryData } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });
  const { handleShareFeed } = useShareFeed();
  const { handleDeleteFeed } = useDeleteFeed();
  const { handleReport } = useReportFeed();

  const categories = categoryData?.map((category) => ({
    id: `${category.id}`,
    name: category.name,
    hasAllCategory: true,
    tags: category.children.map((item) => ({
      id: `${item.id}`,
      name: item.name,
    })),
  }));

  const flattenData = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <Container>
      <CategoryArea>{categories && <CategorySelect categories={categories} />}</CategoryArea>
      <HeightSpacer>
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
                        <button>
                          <FeedCard.Icon name='moreHorizon' />
                        </button>
                      }
                    >
                      {post.isMine ? <FeedDropdown.Item>수정</FeedDropdown.Item> : null}
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
                      <FeedDropdown.Item
                        type='danger'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReport({ postId: `${post.id}` });
                        }}
                      >
                        신고
                      </FeedDropdown.Item>
                    </FeedDropdown>
                  }
                >
                  <FeedCard.Image>
                    {post.images.map((image, index) => (
                      <FeedCard.ImageItem key={`${image}-${index}`} src={image} />
                    ))}
                  </FeedCard.Image>
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
      </HeightSpacer>
      <UploadLink href={playgroundLink.feedUpload()}>
        <UploadIcon />
      </UploadLink>
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

const HeightSpacer = styled.div`
  min-height: 80vh;
`;

const UploadLink = styled(Link)`
  display: flex;
  position: sticky;
  bottom: 32px;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Virtuoso가 sticky 위에 와버리는 문제때문에 z-index로 제어 */
  margin-right: 32px;
  margin-left: auto;
  border-radius: 18px;
  background-color: ${colors.gray10};
  width: 48px;
  height: 48px;

  @media ${MOBILE_MEDIA_QUERY} {
    bottom: 16px;
    margin-right: 16px;
  }
`;

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M11.103 1.103a1.103 1.103 0 10-2.206 0v7.794H1.103a1.103 1.103 0 100 2.206h7.794v7.794a1.103 1.103 0 002.206 0v-7.794h7.794a1.103 1.103 0 100-2.206h-7.794V1.103z'
        fill='#0F0F12'
      />
    </svg>
  );
}
