import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { FeedDetailLink } from '@/components/feed/common/queryParam';
import { getMemberInfo } from '@/components/feed/common/utils';
import CategorySelect from '@/components/feed/list/CategorySelect';
import FeedCard from '@/components/feed/list/FeedCard';

interface FeedListProps {}

const FeedList: FC<FeedListProps> = ({}) => {
  const { data, fetchNextPage } = useGetPostsInfiniteQuery();

  return (
    <Container>
      <ContainerInner>
        <CategoryArea>
          <CategorySelect
            categories={[
              {
                id: 'part',
                name: '파트',
                hasAllCategory: false,
                tags: [
                  { id: 'PM', name: '기획' },
                  { id: 'WEB', name: '웹' },
                  { id: 'SERVER', name: '서버' },
                ],
              },
              {
                id: 'sopt',
                name: 'SOPT활동',
                hasAllCategory: true,
                tags: [
                  { id: 'SOPK', name: '솝커톤' },
                  { id: 'APPJAM', name: '앱잼' },
                ],
              },
            ]}
          />
        </CategoryArea>
        <Virtuoso
          data={data?.pages.flatMap((page) => page.posts)}
          useWindowScroll
          endReached={() => {
            fetchNextPage();
          }}
          itemContent={(_, post) => {
            return (
              <FeedDetailLink css={{ width: '100%' }} feedId={`${post.id}`}>
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
                >
                  <FeedCard.Image>
                    {post.images.map((image, index) => (
                      <FeedCard.ImageItem key={`${image}-${index}`} src={image} />
                    ))}
                  </FeedCard.Image>
                  <FeedCard.Comment>
                    {post.comments.map((comment) => (
                      <FeedCard.CommentItem key={comment.id} comment={comment.content} name={comment.member.name} />
                    ))}
                  </FeedCard.Comment>
                </FeedCard>
              </FeedDetailLink>
            );
          }}
        />
      </ContainerInner>
    </Container>
  );
};

export default FeedList;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
`;

const ContainerInner = styled.div`
  position: absolute;
  inset: 0;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const CategoryArea = styled.div`
  position: sticky;
  top: 0;
  background-color: ${colors.background};
`;
