import styled from '@emotion/styled';

import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface WordChainWinnerProps {
  roomId: number;
  profileImage: string;
  name: string;
}

export default function WordChainWinner({ roomId, profileImage, name }: WordChainWinnerProps) {
  return (
    <WordChainWinnerContainer>
      <WinRound>{roomId}번째</WinRound>
      <WinnerImageBox>
        <WinnerImage src={profileImage} alt='우승자 이미지' />
      </WinnerImageBox>
      <WinnerName>{name}</WinnerName>
    </WordChainWinnerContainer>
  );
}

const WordChainWinnerContainer = styled.article`
  display: grid;
  grid: [row1-start] 'winRound winnerImageBox winnerName' min-content [row1-end]/ auto;
  margin-top: 12px;
  border-radius: 10px;
  background-color: ${colors.black60};
  padding: 14px 20px;
  width: 268px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: grid;
    grid:
      [row1-start] 'winnerImageBox winRound' auto [row1-end]
      [row2-start] 'winnerImageBox winnerName' auto [row2-end]/ auto;
    margin-right: 16px;
    background-color: transparent;
    padding: 0;
    width: 76px;
    height: 32px;
  }
`;

const WinRound = styled.p`
  grid-area: winRound;
  width: 105px;
  color: ${colors.white};
  ${textStyles.SUIT_16_SB}

  &::after {
    content: ' 우승자  | ';
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 2px;
    width: 35px;
    height: 12px;
    color: ${colors.gray60};
    ${textStyles.SUIT_10_M}

    &::after {
      content: '';
    }
  }
`;

const WinnerImageBox = styled.div`
  display: flex;
  grid-area: winnerImageBox;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  overflow: hidden;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-right: 12px;
    width: 32px;
    height: 32px;
  }
`;

const WinnerImage = styled.img`
  transform: translate(50, 50);
  margin: auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WinnerName = styled.p`
  grid-area: winnerName;
  width: 110px;
  color: ${colors.white};
  ${textStyles.SUIT_16_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    width: 35px;
    ${textStyles.SUIT_12_M}
  }
`;