import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Link from 'next/link';

import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface WordChainWinnerProps {
  roomId: number;
  profileImage: string;
  name: string;
  isRecent: boolean;
  userId: number;
}

export default function WordChainWinner({ roomId, profileImage, userId, name, isRecent }: WordChainWinnerProps) {
  return (
    <WordChainWinnerContainer href={playgroundLink.memberDetail(userId)} isRecent={isRecent}>
      <WinRound isRecent={isRecent}>
        {roomId}번째 <WinnerTag> 우승자 | </WinnerTag>
      </WinRound>
      <WinnerImageBox>
        {profileImage ? (
          <WinnerImage src={profileImage} alt='우승자 이미지' />
        ) : (
          <DefaultImage src='/icons/icon-member-default.svg' alt='default_member_image' />
        )}
      </WinnerImageBox>
      <WinnerName isRecent={isRecent}>{name}</WinnerName>
    </WordChainWinnerContainer>
  );
}

const WordChainWinnerContainer = styled(Link)<{ isRecent: boolean }>`
  display: grid;
  grid: [row1-start] 'winRound winnerImageBox winnerName' min-content [row1-end]/ auto;
  border-radius: 10px;
  ${({ isRecent }) =>
    isRecent
      ? css`
          margin-top: 16px;
          background-color: ${colors.white100};
        `
      : css`
          margin-top: 12px;
          background-color: ${colors.black60};
        `}

  padding: 14px 20px;
  width: 268px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: grid;
    grid:
      [row1-start] 'winnerImageBox winRound' auto [row1-end]
      [row2-start] 'winnerImageBox winnerName' auto [row2-end]/ auto;
    margin-top: 12px;
    margin-right: 16px;
    background-color: transparent;
    padding: 0;
    height: max-content;
  }
`;

const WinRound = styled.div<{ isRecent: boolean }>`
  display: flex;
  grid-area: winRound;
  width: 110px;
  color: ${colors.white};
  ${textStyles.SUIT_16_SB}

  ${({ isRecent }) =>
    isRecent &&
    css`
      color: ${colors.black100};
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 2px;
    width: 35px;
    height: 12px;
    color: ${colors.gray60};
    ${textStyles.SUIT_10_M}

    ::after {
      content: '';
    }
  }
`;

const WinnerTag = styled.p`
  display: block;
  margin: 0 5px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const WinnerImageBox = styled.div`
  display: flex;
  grid-area: winnerImageBox;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  border-radius: 50%;
  background-color: ${colors.black40};
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
  margin: auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DefaultImage = styled.img`
  margin: auto;
  width: 40%;
  object-fit: cover;
`;

const WinnerName = styled.p<{ isRecent: boolean }>`
  grid-area: winnerName;
  width: 110px;
  color: ${colors.white};
  ${textStyles.SUIT_16_SB}

  ${({ isRecent }) =>
    isRecent &&
    css`
      color: ${colors.black100};
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    width: 35px;
    color: ${colors.white};
    ${textStyles.SUIT_12_M}
  }
`;
