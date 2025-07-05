import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconHeart } from '@sopt-makers/icons';

import MessageIc from '@/public/icons/icon-message-square.svg';
import ThumbsUpIc from '@/public/icons/icon-thumbs-up.svg';

type IconType = 'message' | 'thumbsUp' | 'heart';

interface FeedIconProps {
  type: IconType;
  count: number;
}

const iconMap = {
  message: MessageIc,
  thumbsUp: ThumbsUpIc,
  heart: IconHeart as React.FC<React.SVGProps<SVGSVGElement>>,
};

const FeedIcon = ({ type, count }: FeedIconProps) => {
  const Icon = iconMap[type];

  return (
    <FeedIconLayout>
      <Icon width={16} height={16} color={colors.gray400} />
      {count}
    </FeedIconLayout>
  );
};

export default FeedIcon;

const FeedIconLayout = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
