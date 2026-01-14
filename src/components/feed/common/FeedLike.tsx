import { css } from '@emotion/react';
import { colors } from '@sopt-makers/colors';
import { IconMessageSquare } from '@sopt-makers/icons';
import { Flex } from '@toss/emotion-utils';
import React from 'react';

import Text from '@/components/common/Text';
import { IconHeart, IconThumbsUp } from '@/components/feed/common/Icon';

interface FeedLikeProps {
  isLiked?: boolean;
  likes: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  type?: 'heart' | 'message' | 'thumb' | 'helpful';
}

export const FeedLike = ({ isLiked = false, likes, onClick, type = 'heart' }: FeedLikeProps) => {
  const hoverStyle = css`
    &:hover .btn-hover {
      stroke: ${colors.white};
      color: ${colors.white};
    }
  `;

  const layoutStyle = css`
    border: 1px solid ${colors.gray700};
    border-radius: 51px;
    padding: 8px 12px;
  `;

  const renderIcon = () => {
    switch (type) {
      case 'message':
        return <IconMessageSquare className='btn-hover' style={{ width: 16, height: 16 }} />;
      case 'thumb':
        return <IconThumbsUp className='btn-hover' fill={isLiked} />;
      case 'heart':
      default:
        return <IconHeart fill={isLiked ? undefined : 'none'} className='btn-hover' />;
    }
  };

  const getDefaultBtnText = (type: FeedLikeProps['type']): string => {
    switch (type) {
      case 'helpful':
        return '도움돼요';
      case 'heart':
        return '좋아요';
      case 'thumb':
        return '나도 궁금해요';
      default:
        return '';
    }
  };

  const resolvedBtnText = getDefaultBtnText(type);

  return (
    <Flex
      align='center'
      css={[{ gap: '4px', cursor: 'pointer', color: colors.gray400 }, hoverStyle, layoutStyle]}
      onClick={onClick}
    >
      {renderIcon()}

      {resolvedBtnText && (
        <Text typography='SUIT_14_SB' color={isLiked ? colors.white : colors.gray400} className='btn-hover'>
          {resolvedBtnText}
        </Text>
      )}
      {likes > 0 && (
        <Text typography='SUIT_14_SB' color={isLiked ? colors.white : colors.gray400} className='btn-hover'>
          {likes}
        </Text>
      )}
    </Flex>
  );
};

export default FeedLike;
