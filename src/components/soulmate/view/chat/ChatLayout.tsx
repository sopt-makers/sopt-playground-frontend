import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import ChatRule from '@/components/soulmate/view/chat/ChatRule';
import Feedback from '@/components/soulmate/view/chat/Feedback';
import { cardStyle } from '@/components/soulmate/view/common/commonStyles';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ChatLayoutProps {
  className?: string;

  progressSlot: ReactNode;
  chatSlot: ReactNode;
}

const ChatLayout: FC<ChatLayoutProps> = ({ className, progressSlot, chatSlot }) => {
  return (
    <Container className={className}>
      <Title>💬 소울메이트 채팅방</Title>
      <StyledChatRule />
      <ProgressArea>{progressSlot}</ProgressArea>
      <ChatArea>{chatSlot}</ChatArea>
      <FeedbackArea>
        <Feedback />
      </FeedbackArea>
    </Container>
  );
};

export default ChatLayout;

const Container = styled.div`
  display: grid;
  grid:
    'title title' auto
    'rule progress' auto
    'chat progress' auto
    'chat feedback' auto
    'chat blank' 1fr / 1fr 260px;
  row-gap: 36px;
  column-gap: 32px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid:
      'title' auto
      'rule' auto
      'menu' auto
      'chat' 1fr
      / 1fr;
    row-gap: 0;
    column-gap: 0;
  }
`;

const Title = styled.h1`
  grid-area: title;
  justify-self: flex-start;
  margin-bottom: 16px;

  ${textStyles.SUIT_40_B};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 10px;

    ${textStyles.SUIT_20_B};
  }
`;

const StyledChatRule = styled(ChatRule)`
  grid-area: rule;
`;

const ProgressArea = styled.div`
  ${cardStyle};

  grid-area: progress;
  padding: 28px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const ChatArea = styled.div`
  grid-area: chat;
  margin-top: 20px;
`;

const FeedbackArea = styled.div`
  ${cardStyle};

  grid-area: feedback;
  padding: 28px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;
