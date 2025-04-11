import { FC } from 'react';

import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { getPost, useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import FeedLike from '@/components/feed/common/FeedLike';
import { useToggleLike } from '@/components/feed/common/hooks/useToggleLike';
import { getMemberInfo } from '@/components/feed/common/utils';
import { SOPTICLE_CATEGORY_ID } from '@/components/feed/constants';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';

interface FeedDetailContentProps {
  postId: string;
}

const FeedDetailContent: FC<FeedDetailContentProps> = ({ postId }) => {
  const { data: commentData } = useGetCommentQuery(postId);
  const { data: postData } = useGetPostQuery(postId);
  const { handleToggleLike } = useToggleLike();

  if (postData == null) {
    return null;
  }

  const isSopticle = postData.posts.categoryId === SOPTICLE_CATEGORY_ID;

  return (
    <DetailFeedCard.Main>
      {postData.posts.isBlindWriter ? (
        <DetailFeedCard.Top
          isBlindWriter={postData.posts.isBlindWriter}
          anonymousProfile={postData.anonymousProfile}
          createdAt={postData.posts.createdAt}
          memberId={null}
        />
      ) : postData.member ? (
        <DetailFeedCard.Top
          isBlindWriter={postData.posts.isBlindWriter}
          name={postData.member.name}
          profileImage={postData.member.profileImage}
          info={getMemberInfo({
            categoryId: postData.category.id,
            categoryName: postData.category.name,
            member: postData.member,
          })}
          createdAt={postData.posts.createdAt}
          memberId={postData.member.id}
        />
      ) : null}
      <DetailFeedCard.Content
        isQuestion={postData.posts.isQuestion}
        title={postData.posts.title}
        hits={postData.posts.hits}
        commentLength={commentData?.length ?? 0}
        content={postData.posts.content}
        images={postData.posts.images}
        isSopticle={isSopticle}
        sopticleUrl={postData.posts.sopticleUrl ?? ''}
        thumbnailUrl={postData.posts.images[0]}
        like={
          <FeedLike
            isLiked={postData.isLiked}
            likes={postData.likes}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleToggleLike({
                postId: Number(postId),
                isLiked: postData.isLiked,
                likes: postData.likes,
                allPostsQueryKey: useGetPostsInfiniteQuery.getKey(''),
                postsQueryKey: useGetPostsInfiniteQuery.getKey(postData.posts.categoryId.toString()),
                postQueryKey: getPost.cacheKey(postId),
              });
            }}
          />
        }
      />
    </DetailFeedCard.Main>
  );
};

export default FeedDetailContent;
