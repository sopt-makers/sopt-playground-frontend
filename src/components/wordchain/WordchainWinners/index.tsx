import styled from '@emotion/styled';

import WordChainWinner from '@/components/wordchain/WordchainWinners/WordChainWinner';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function WordchainWinners() {
  const WORDCHAIN_WINNERS_DATA = {
    winners: [
      {
        roomId: 25,
        winner: {
          id: 1,
          profileImage: 'https://item.kakaocdn.net/do/22b3b5f6c65114f383f5986c98828993616b58f7bf017e58d417ccb3283deeb3',
          name: '남주영',
        },
      },
      {
        roomId: 24,
        winner: {
          id: 2,
          profileImage: 'https://item.kakaocdn.net/do/22b3b5f6c65114f383f5986c98828993616b58f7bf017e58d417ccb3283deeb3',
          name: '박건영',
        },
      },
      {
        roomId: 23,
        winner: {
          id: 3,
          profileImage: 'https://item.kakaocdn.net/do/22b3b5f6c65114f383f5986c98828993616b58f7bf017e58d417ccb3283deeb3',
          name: '서지수',
        },
      },
      {
        roomId: 22,
        winner: {
          id: 4,
          profileImage: 'https://item.kakaocdn.net/do/22b3b5f6c65114f383f5986c98828993616b58f7bf017e58d417ccb3283deeb3',
          name: '이준호',
        },
      },
      {
        roomId: 21,
        winner: {
          id: 5,
          profileImage: 'https://item.kakaocdn.net/do/22b3b5f6c65114f383f5986c98828993616b58f7bf017e58d417ccb3283deeb3',
          name: '솝트짱',
        },
      },
    ],
    hasNext: true,
  };

  return (
    <WinnerBoard>
      <WinnerHeader>👑 역대 우승자 명예의 전당 👑</WinnerHeader>
      <WinnerList>
        {WORDCHAIN_WINNERS_DATA.winners?.map(({ roomId, winner }) => {
          const { id, profileImage, name } = winner;
          return <WordChainWinner key={id} roomId={roomId} profileImage={profileImage} name={name} />;
        })}
      </WinnerList>
    </WinnerBoard>
  );
}

const WinnerBoard = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background-color: ${colors.black80};
  padding: 28px;
  width: 324px;
  height: 382px;

  @media ${MOBILE_MEDIA_QUERY} {
    align-items: flex-start;
    margin-left: 20px;
    background-color: transparent;
    padding: 0;
    width: 352px;
    height: 63px;
  }
`;

const WinnerHeader = styled.h1`
  color: ${colors.white};

  ${textStyles.SUIT_20_B}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_SB}
  }
`;

const WinnerList = styled.section`
  display: flex;
  flex-direction: column;
  height: 312px;
  overflow: scroll;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: row;
    width: 352px;
    height: 45px;
  }
`;
