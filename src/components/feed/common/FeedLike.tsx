import { css } from '@emotion/react';
import { colors } from '@sopt-makers/colors';
import { Flex } from '@toss/emotion-utils';
import React from 'react';

import Text from '@/components/common/Text';
import { IconHeart } from '@/components/feed/common/Icon';

interface FeedLikeProps {
  isLiked: boolean;
  likes: number;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const FeedLike = ({ isLiked, likes, onClick }: FeedLikeProps) => {
  const hoverStyle = css`
    &:hover .icon-heart-hover {
      stroke: ${colors.gray50};
    }
  `;

  return (
    <Flex align='center' css={[{ gap: '4px' }, hoverStyle]} onClick={onClick}>
      <IconHeart fill={isLiked ? undefined : 'none'} className='icon-heart-hover' />
      <Text typography='SUIT_14_R' color={isLiked ? colors.error : colors.gray400}>{`좋아요 ${likes}`}</Text>
    </Flex>
  );
};

export default FeedLike;
