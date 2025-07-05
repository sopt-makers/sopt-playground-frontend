import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { getPost, useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { getRecentPosts } from '@/api/endpoint/feed/getRecentPosts';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import FeedLike from '@/components/feed/common/FeedLike';
import { useToggleLike } from '@/components/feed/common/hooks/useToggleLike';
import { getMemberInfo, getParentCategoryId } from '@/components/feed/common/utils';
import { QUESTION_CATEGORY_ID, SOPTICLE_CATEGORY_ID } from '@/components/feed/constants';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';

interface FeedDetailContentProps {
  postId: string;
}

const FeedDetailContent: FC<FeedDetailContentProps> = ({ postId }) => {
  const { data: commentData } = useGetCommentQuery(postId);
  const { data: postData } = useGetPostQuery(postId);
  const { handleToggleLike } = useToggleLike();

  const { data: categoryData } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  if (postData == null) {
    return null;
  }

  const isSopticle = postData.posts.categoryId === SOPTICLE_CATEGORY_ID;
  const isQuestion = postData.posts.categoryId === QUESTION_CATEGORY_ID;

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
  const parent = parentCategory(postData.category.id, postData.category.name);
  const category = parent === postData.category.name ? postData.category.name : `${parent}_${postData.category.name}`;

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
        isQuestion={isQuestion}
        title={postData.posts.title}
        hits={postData.posts.hits}
        commentLength={commentData?.length ?? 0}
        content={postData.posts.content}
        images={postData.posts.images}
        isSopticle={isSopticle}
        sopticleUrl={postData.posts.sopticleUrl ?? ''}
        thumbnailUrl={postData.posts.images[0]}
        isMine={postData.isMine}
        vote={postData.posts.vote}
        postId={postData.posts.id}
        categoryId={postData.posts.categoryId}
        like={
          <LoggingClick eventKey={postData.isLiked ? 'feedUnlike' : 'feedLike'} param={{ feedId: postId, category }}>
            <FeedLike
              isLiked={postData.isLiked}
              likes={postData.likes}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                const parentId = getParentCategoryId(categoryData, postData.posts.categoryId);

                handleToggleLike({
                  postId: Number(postId),
                  isLiked: postData.isLiked,
                  likes: postData.likes,
                  allPostsQueryKey: useGetPostsInfiniteQuery.getKey(parentId.toString()),
                  postsQueryKey: useGetPostsInfiniteQuery.getKey(postData.posts.categoryId.toString()),
                  postQueryKey: getPost.cacheKey(postId),
                  recentPostsQuerykey: getRecentPosts.cacheKey(),
                });
              }}
              type={isQuestion ? 'thumb' : 'heart'}
            />
          </LoggingClick>
        }
      />
    </DetailFeedCard.Main>
  );
};

export default FeedDetailContent;
