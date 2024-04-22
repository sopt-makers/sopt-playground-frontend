import { Flex } from '@toss/emotion-utils';

import Text from '@/components/common/Text';
import { usePostLike } from '@/components/feed/common/hooks/usePostLike';
import { IconHeart } from '@/components/feed/common/Icon';

interface FeedLikeProps {
  postId: number;
  isLiked: boolean;
}

export const FeedLike = ({ postId, isLiked }: FeedLikeProps) => {
  const { handlePostLike } = usePostLike();
  return (
    <Flex
      align='center'
      css={{ gap: '4px' }}
      onClick={(e) => {
        e.stopPropagation();
        handlePostLike(postId);
      }}
    >
      <IconHeart fill={isLiked ? undefined : 'none'} />
      <Text typography='SUIT_13_R'>{`좋아요 ${'개수'}`}</Text>
    </Flex>
  );
};

export default FeedLike;
