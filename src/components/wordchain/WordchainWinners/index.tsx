import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Fragment, useEffect } from 'react';

import { useWordchainWinnersQuery } from '@/components/wordchain/WordchainWinners/hooks/useWordchainWinnersQuery';
import WordChainWinner from '@/components/wordchain/WordchainWinners/WordchainWinner';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const PAGE_LIMIT = 15;

export default function WordchainWinners() {
  const { ref, isVisible } = useIntersectionObserver();

  const { data: wordchainWinnersData, fetchNextPage } = useWordchainWinnersQuery({
    limit: PAGE_LIMIT,
  });

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible, fetchNextPage]);

  return (
    <WinnerBoard>
      <WinnerHeader>👑 역대 우승자 명예의 전당 👑</WinnerHeader>
      <WinnerList>
        {wordchainWinnersData?.pages.map((page, totalListIndex) => (
          <Fragment key={totalListIndex}>
            {page.winners.map(({ roomId, winner: { id, profileImage, name } }, winnerIndex) => {
              const isRecent = totalListIndex === 0 && winnerIndex === 0;

              return (
                <WordChainWinner
                  key={`${roomId}` + `${id}`}
                  roomId={roomId}
                  userId={id}
                  profileImage={profileImage}
                  name={name}
                  isRecent={isRecent}
                />
              );
            })}
          </Fragment>
        ))}
        <Target ref={ref} />
      </WinnerList>
    </WinnerBoard>
  );
}

const Target = styled.div`
  /* height: 5px; */
`;

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
    margin: 20px 3px 24px 0;
    background-color: transparent;
    padding: 0;
    width: 100%;
    height: max-content;
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
  margin-bottom: -4px;
  padding-bottom: 2px;
  height: 312px;
  overflow-y: scroll;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: row;
    margin-bottom: 0;
    padding-bottom: 8px;
    width: 100%;
    height: max-content;
    overflow-x: scroll;
    overflow-y: auto;
  }
`;
