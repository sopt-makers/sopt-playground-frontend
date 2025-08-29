import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { atom, useRecoilState } from 'recoil';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { getMemberInfo } from '@/components/feed/common/utils';
import CrewFeedListItem from '@/components/feed/list/CrewFeedList/CrewFeedListItem';
import FeedSkeleton from '@/components/feed/list/FeedSkeleton';
import { useNavigateBack } from '@/components/navigation/useNavigateBack';
import { textStyles } from '@/styles/typography';

interface CrewFeedListProps {
  categoryId: string;
  onScrollChange?: (scrolling: boolean) => void;
}

const scrollIndexAtom = atom<Record<string, number>>({
  key: 'scrollAtom',
  default: {},
});

const CrewFeedList = ({ categoryId, onScrollChange }: CrewFeedListProps) => {
  const { data, refetch, fetchNextPage, isLoading, isError } = useGetPostsInfiniteQuery({
    categoryId,
  });

  const flattenData = data?.pages.flatMap((page) => page.posts) ?? [];

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

  const handleFeedCardClick = (idx: number) => {
    setMap((map) => ({ ...map, [categoryId]: idx }));
  };

  const handleFeedContentClick = (postId: number) => {
    window.location.href = `/group/post?id=${postId}`;
  };

  if (isLoading) return <FeedSkeleton />;

  if (isError) {
    return (
      <div css={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
        <AlertText>오류가 발생했어요.</AlertText>
      </div>
    );
  }

  if (data != null && flattenData.length === 0) {
    return (
      <div css={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
        <AlertText>아직 작성된 글이 없어요(ㅠ_ㅠ)</AlertText>
      </div>
    );
  }

  return (
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
        console.info({ post });

        if (post.meetingId) {
          return (
            <CrewFeedListItem
              postId={post.id}
              onFeedCardClick={() => handleFeedCardClick(idx)}
              onFeedContentClick={() => handleFeedContentClick(post.id)}
              memberInfo={getMemberInfo({
                categoryId: post.categoryId,
                categoryName: post.categoryName,
                member: {
                  activity: post.member?.activity ?? { generation: 0, part: '' },
                  careers: post.member?.careers ?? null,
                },
              })}
            />
          );
        }
      }}
    />
  );
};

export default CrewFeedList;

const AlertText = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 90px;
  width: 100%;
  color: ${colors.gray300};
  ${textStyles.SUIT_14_M};
`;
