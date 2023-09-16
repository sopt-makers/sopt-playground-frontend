import styled from '@emotion/styled';
import { Fragment, useEffect, useMemo } from 'react';

import { useWordchainWinnersQuery } from '@/components/wordchain/WordchainWinners/hooks/useWordchainWinnersQuery';
import WordChainWinner from '@/components/wordchain/WordchainWinners/WordChainWinner';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const PAGE_LIMIT = 5;

export default function WordchainWinners() {
  const { ref, isVisible } = useIntersectionObserver();

  const { data: wordchainWinnersData, fetchNextPage } = useWordchainWinnersQuery({
    limit: PAGE_LIMIT,
    queryKey: ['getWordchainWinners'],
  });

  const wordchainWinners = useMemo(
    () =>
      wordchainWinnersData?.pages.map((page) =>
        page.winners.map((winner) => ({
          ...winner,
        })),
      ),
    [wordchainWinnersData],
  );

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible, fetchNextPage]);

  return (
    <WinnerBoard>
      <WinnerHeader>👑 역대 우승자 명예의 전당 👑</WinnerHeader>
      <WinnerList>
        {wordchainWinners?.map((winnerList, totalListIndex) => (
          <Fragment key={totalListIndex}>
            {winnerList?.map(({ roomId, winner }, winnerIndex) => {
              const isRecent = totalListIndex === 0 && winnerIndex === 0;
              const { id, profileImage, name } = winner;
              return (
                <WordChainWinner key={id} roomId={roomId} profileImage={profileImage} name={name} isRecent={isRecent} />
              );
            })}
          </Fragment>
        ))}
        <Target ref={ref} />
      </WinnerList>
    </WinnerBoard>
  );
}

const Target = styled.div``;

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
  margin-bottom: -4px;
  height: 312px;
  overflow: scroll;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: row;
    margin-bottom: 0;
    width: 100%;
    height: 45px;
  }
`;
