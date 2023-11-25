import { FC } from 'react';

import { useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { getMemberInfo } from '@/components/feed/common/utils';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';

interface FeedDetailContentProps {
  postId: string;
}

const FeedDetailContent: FC<FeedDetailContentProps> = ({ postId }) => {
  const { data: postData } = useGetPostQuery(postId);

  if (postData == null) {
    return null;
  }

  return (
    <DetailFeedCard.Main>
      {postData.posts.isBlindWriter ? (
        <DetailFeedCard.Top isBlindWriter={postData.posts.isBlindWriter} createdAt={postData.posts.createdAt} />
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
        />
      ) : null}
      <DetailFeedCard.Content
        isQuestion
        title={postData.posts.title}
        hits={postData.posts.hits}
        commentLength={postData.posts.comments.length}
        content={postData.posts.content}
        images={postData.posts.images}
      />
    </DetailFeedCard.Main>
  );
};

export default FeedDetailContent;
