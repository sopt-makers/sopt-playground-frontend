import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import { cardStyle } from '@/components/soulmate/view/commonStyles';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MatchingStatusProps {
  title: string;
  mission: string;
  chatUrl?: string;
}

const MatchingStatus: FC<MatchingStatusProps> = ({ title, mission, chatUrl }) => {
  return (
    <StyledMatchingStatus>
      <Title>{title}</Title>
      <Mission>{mission}</Mission>
      {chatUrl && <Button href={chatUrl}>채팅방 바로가기</Button>}
    </StyledMatchingStatus>
  );
};

export default MatchingStatus;

const StyledMatchingStatus = styled.div`
  ${cardStyle};

  display: grid;
  grid:
    'title title' auto
    'mission button' 48px / 1fr auto;
  padding: 48px 40px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid:
      'title' auto
      'mission' auto
      'button' auto / 1fr;
    padding: 20px;
  }
`;

const Title = styled.div`
  grid-area: title;
  margin-bottom: 10px;

  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 20px;

    ${textStyles.SUIT_14_M};
  }
`;

const Mission = styled.div`
  grid-area: mission;
  align-self: center;

  ${textStyles.SUIT_24_B};

  @media ${MOBILE_MEDIA_QUERY} {
    line-height: 120%;
    letter-spacing: -0.16px;

    ${textStyles.SUIT_16_B};
  }
`;

const Button = styled(Link)`
  display: flex;
  grid-area: button;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.purple100};
  padding: 14px 20px;
  width: 180px;

  ${textStyles.SUIT_16_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    align-self: stretch;
    margin-top: 10px;
    border-radius: 10px;
    width: unset;

    ${textStyles.SUIT_14_SB};
  }
`;
