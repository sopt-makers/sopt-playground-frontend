import { Flex } from '@toss/emotion-utils';
import React from 'react';

import Text from '@/components/common/Text';
import { IconHeart } from '@/components/feed/common/Icon';

interface FeedLikeProps {
  isLiked: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const FeedLike = ({ isLiked, onClick }: FeedLikeProps) => {
  return (
    <Flex align='center' css={{ gap: '4px' }} onClick={onClick}>
      <IconHeart fill={isLiked ? undefined : 'none'} />
      <Text typography='SUIT_13_R'>{`좋아요 ${'개수'}`}</Text>
    </Flex>
  );
};

export default FeedLike;
