import styled from '@emotion/styled';

import MessageIc from '@/public/icons/icon-message-square.svg';
import ThumbsUpIc from '@/public/icons/icon-thumbs-up.svg';

type IconType = 'message' | 'thumbsUp';

interface FeedIconProps {
  type: IconType;
  count: number;
}

const iconMap = {
  message: MessageIc,
  thumbsUp: ThumbsUpIc,
};

const FeedIcon = ({ type, count }: FeedIconProps) => {
  const Icon = iconMap[type];

  return (
    <FeedIconLayout>
      <Icon />
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
