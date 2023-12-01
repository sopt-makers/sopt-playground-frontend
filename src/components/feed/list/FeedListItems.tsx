import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useQuery } from '@tanstack/react-query';
import { Flex } from '@toss/emotion-utils';
import { FC, ReactNode } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import Loading from '@/components/common/Loading';
import Text from '@/components/common/Text';
import useToast from '@/components/common/Toast/useToast';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import { useDeleteFeed } from '@/components/feed/common/hooks/useDeleteFeed';
import { useReportFeed } from '@/components/feed/common/hooks/useReportFeed';
import { useShareFeed } from '@/components/feed/common/hooks/useShareFeed';
import { CategoryList, getMemberInfo } from '@/components/feed/common/utils';
import FeedCard from '@/components/feed/list/FeedCard';
import { textStyles } from '@/styles/typography';

interface FeedListItemsProps {
  categoryId: string | undefined;
  renderFeedDetailLink: (props: { children: ReactNode; feedId: string }) => ReactNode;
  onScrollChange?: (scrolling: boolean) => void;
}

const FeedListItems: FC<FeedListItemsProps> = ({ categoryId, renderFeedDetailLink, onScrollChange }) => {
  const { data, refetch, fetchNextPage, isLoading, isError } = useGetPostsInfiniteQuery({
    categoryId,
  });

  const { handleShareFeed } = useShareFeed();
  const { handleDeleteFeed } = useDeleteFeed();
  const { handleReport } = useReportFeed();

  const flattenData = data?.pages.flatMap((page) => page.posts) ?? [];
  const toast = useToast();
  const { data: categoryData } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  const parentCategory = (categoryId: number, tag: string) => {
    const category =
      categoryData &&
      categoryData.find((category) =>
        category.children.length > 0
          ? category.children.some((tag) => tag.id === categoryId) || category.id === categoryId
          : category.id === categoryId,
      )?.name;

    return uploadedCategory(category, tag);
  };

  const uploadedCategory = (category: string | undefined, tag: string) => {
    switch (category) {
      case tag:
        return category;
      case CategoryList.파트:
        return tag + category;
      case CategoryList.SOPT활동:
        return tag;
      case CategoryList.취업_진로:
        return '취업 ' + tag;
      case CategoryList.홍보:
        return tag === '채용' ? tag : tag + ' ' + category;
      default:
        return category;
    }
  };

  return (
    <>
      <Virtuoso
        data={flattenData}
        useWindowScroll
        endReached={() => {
          fetchNextPage();
        }}
        isScrolling={onScrollChange}
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
                isShowInfo={categoryId === ''}
                memberId={post.member?.id ?? 0}
                info={
                  categoryId ? (
                    <>
                      <Text typography='SUIT_14_R' lineHeight={20} color={colors.gray400}>
                        ∙
                      </Text>
                      <>
                        {getMemberInfo({
                          categoryId: post.categoryId,
                          categoryName: post.categoryName,
                          member: {
                            activity: post.member?.activity ?? { generation: 0, part: '' },
                            careers: post.member?.careers ?? null,
                          },
                        })}
                      </>
                    </>
                  ) : (
                    <>
                      님이 <Text />
                      <Text typography='SUIT_14_B' lineHeight={20} color={colors.gray100}>
                        {parentCategory(post.categoryId, post.categoryName)}
                      </Text>
                      에 남김
                    </>
                  )
                }
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
                    <LoggingClick eventKey='feedShareButton' param={{ feedId: String(post.id), referral: 'list' }}>
                      <FeedDropdown.Item
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShareFeed(`${post.id}`);
                        }}
                      >
                        공유
                      </FeedDropdown.Item>
                    </LoggingClick>
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
        {isError ? <AlertText>오류가 발생했어요.</AlertText> : null}
        {data != null && flattenData.length === 0 ? <AlertText>아직 작성된 글이 없어요(ㅠ_ㅠ)</AlertText> : null}
        {isLoading ? <Loading /> : null}
      </div>
    </>
  );
};

export default FeedListItems;

const AlertText = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 90px;
  width: 100%;
  color: ${colors.gray300};
  ${textStyles.SUIT_14_M};
`;
