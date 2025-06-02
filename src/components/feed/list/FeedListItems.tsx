import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconAlertTriangle, IconShare, IconTrash, IconWrite } from '@sopt-makers/icons';
import { useQuery } from '@tanstack/react-query';
import { Flex } from '@toss/emotion-utils';
import Link from 'next/link';
import { playgroundLink } from 'playground-common/export';
import { FC, ReactNode, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { atom, useRecoilState } from 'recoil';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { getPost } from '@/api/endpoint/feed/getPost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { getWaitingQuestions } from '@/api/endpoint/feed/getWaitingQuestions';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import FeedLike from '@/components/feed/common/FeedLike';
import { useDeleteFeed } from '@/components/feed/common/hooks/useDeleteFeed';
import { useReportFeed } from '@/components/feed/common/hooks/useReportFeed';
import { useShareFeed } from '@/components/feed/common/hooks/useShareFeed';
import { useToggleLike } from '@/components/feed/common/hooks/useToggleLike';
import { CategoryList, getMemberInfo } from '@/components/feed/common/utils';
import { QUESTION_CATEGORY_ID, SOPTICLE_CATEGORY_ID } from '@/components/feed/constants';
import FeedCard from '@/components/feed/list/FeedCard';
import FeedSkeleton from '@/components/feed/list/FeedSkeleton';
import { useNavigateBack } from '@/components/navigation/useNavigateBack';
import { textStyles } from '@/styles/typography';

interface FeedListItemsProps {
  categoryId: string | undefined;
  renderFeedDetailLink: (props: { children: ReactNode; feedId: string; category: string }) => ReactNode;
  onScrollChange?: (scrolling: boolean) => void;
}

const scrollIndexAtom = atom<Record<string, number>>({
  key: 'scrollAtom',
  default: {},
});

const FeedListItems: FC<FeedListItemsProps> = ({ categoryId, renderFeedDetailLink, onScrollChange }) => {
  const { data, refetch, fetchNextPage, isLoading, isError } = useGetPostsInfiniteQuery({
    categoryId,
  });

  const { handleShareFeed } = useShareFeed();
  const { handleDeleteFeed } = useDeleteFeed();
  const { handleReport } = useReportFeed();
  const { handleToggleLike } = useToggleLike();

  const flattenData = data?.pages.flatMap((page) => page.posts) ?? [];

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

    return category;
  };

  const [map, setMap] = useRecoilState(scrollIndexAtom);
  const virtuoso = useRef<VirtuosoHandle>(null);

  useNavigateBack(() => {
    const idx = map[categoryId ?? ''];
    if (idx != null) {
      virtuoso.current?.scrollToIndex({
        index: idx,
        align: 'center',
      });
    }
  });

  if (isLoading) return <FeedSkeleton />;

  return (
    <>
      <Virtuoso
        data={flattenData}
        ref={virtuoso}
        rangeChanged={({ startIndex, endIndex }) => {
          setMap((map) => ({ ...map, [categoryId ?? '']: (startIndex + endIndex) / 2 }));
        }}
        useWindowScroll
        endReached={() => {
          fetchNextPage();
        }}
        isScrolling={onScrollChange}
        itemContent={(idx, post) => {
          const isSopticle = post.categoryId === SOPTICLE_CATEGORY_ID;
          const isQuestion = post.categoryId === QUESTION_CATEGORY_ID;
          const parent = parentCategory(post.categoryId, post.categoryName);
          const category = parent === post.categoryName ? post.categoryName : `${parent}_${post.categoryName}`;

          return renderFeedDetailLink({
            feedId: `${post.id}`,
            category,
            children: (
              <FeedCard
                onClick={() => setMap((map) => ({ ...map, [categoryId ?? '']: idx }))}
                name={post.member?.name ?? '익명'}
                title={post.title}
                content={post.content}
                profileImage={post.member?.profileImage ?? null}
                createdAt={post.createdAt ?? ''}
                commentLength={post.commentCount}
                hits={post.hits}
                isBlindWriter={post.isBlindWriter}
                anonymousProfile={post.anonymousProfile}
                isQuestion={isQuestion}
                isShowInfo={categoryId === ''} // 전체 카테고리일 때
                memberId={post.member?.id ?? 0}
                isSopticle={isSopticle}
                sopticleUrl={post.sopticleUrl ?? ''}
                thumbnailUrl={post.images[0]}
                info={
                  categoryId ? (
                    <>
                      {!post.isBlindWriter && (
                        <>
                          <Text
                            typography='SUIT_14_R'
                            lineHeight={20}
                            color={colors.gray400}
                            style={{ margin: '0 2px' }}
                          >
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
                      )}
                      <Text typography='SUIT_14_R' lineHeight={20} color={colors.gray400} style={{ margin: '0 2px' }}>
                        ∙
                      </Text>
                      {post.createdAt}
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
                        <FeedCard.Icon />
                      </Flex>
                    }
                  >
                    {post.isMine ? (
                      <Link href={playgroundLink.feedEdit(post.id)}>
                        <FeedDropdown.Item>
                          <Flex align='center' css={{ gap: '10px', color: `${colors.gray10} ` }}>
                            <IconWrite css={{ width: '16px', height: '16px' }} />
                            수정
                          </Flex>
                        </FeedDropdown.Item>
                      </Link>
                    ) : null}
                    <LoggingClick eventKey='feedShareButton' param={{ feedId: String(post.id), referral: 'list' }}>
                      <FeedDropdown.Item
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShareFeed(`${post.id}`);
                        }}
                      >
                        <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                          <IconShare css={{ width: '16px', height: '16px' }} />
                          공유
                        </Flex>
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
                        <Flex align='center' css={{ gap: '10px' }}>
                          <IconTrash css={{ width: '16px', height: '16px' }} />
                          삭제
                        </Flex>
                      </FeedDropdown.Item>
                    ) : null}
                    {!post.isMine ? (
                      <FeedDropdown.Item
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReport({ postId: `${post.id}` });
                        }}
                      >
                        <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                          <IconAlertTriangle css={{ width: '16px', height: '16px' }} />
                          신고
                        </Flex>
                      </FeedDropdown.Item>
                    ) : null}
                  </FeedDropdown>
                }
                like={
                  <LoggingClick
                    eventKey={post.isLiked ? 'feedUnlike' : 'feedLike'}
                    param={{ feedId: String(post.id), category }}
                  >
                    <FeedLike
                      isLiked={post.isLiked}
                      likes={post.likes}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleToggleLike({
                          postId: post.id,
                          isLiked: post.isLiked,
                          likes: post.likes,
                          allPostsQueryKey: useGetPostsInfiniteQuery.getKey(''),
                          postsQueryKey: useGetPostsInfiniteQuery.getKey(post.categoryId.toString()),
                          postQueryKey: getPost.cacheKey(post.id.toString()),
                          waitingQuestionQuerykey: getWaitingQuestions.cacheKey(),
                        });
                      }}
                      type={isQuestion ? 'thumb' : 'heart'}
                    />
                  </LoggingClick>
                }
              >
                {!isSopticle && post.images.length !== 0 && (
                  <FeedCard.Image>
                    {post.images.map((image, index) => (
                      <FeedCard.ImageItem key={`${image}-${index}`} src={image} height={240} />
                    ))}
                  </FeedCard.Image>
                )}
              </FeedCard>
            ),
          });
        }}
      />
      <div css={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
        {isError ? <AlertText>오류가 발생했어요.</AlertText> : null}
        {data != null && flattenData.length === 0 ? <AlertText>아직 작성된 글이 없어요(ㅠ_ㅠ)</AlertText> : null}
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
