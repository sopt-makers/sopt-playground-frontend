import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Flex } from '@toss/emotion-utils';
import Link from 'next/link';
import { FC } from 'react';

import { useGetEntryWordchain } from '@/api/endpoint/wordchain/getWordchain';
import { ADS } from '@/components/common/Banner/AdsBanner/constants/ads';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import WordchainMessage from '@/components/wordchain/WordchainEntry/WordchainMessage';
import {
  WordchainSkeletonDesktop,
  WordchainSkeletonMobile,
} from '@/components/wordchain/WordchainEntry/WordchainSkeleton';
import { useWordchainWinnersQuery } from '@/components/wordchain/WordchainWinners/hooks/useWordchainWinnersQuery';
import { playgroundLink } from '@/constants/links';
import IconMessageChat from '@/public/icons/icon-message-chat.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { SwitchCase } from '@/utils/components/switch-case/SwitchCase';

interface WordChainEntryProps {
  className?: string;
}

const WordChainEntry: FC<WordChainEntryProps> = ({ className }) => {
  const { data, isLoading } = useGetEntryWordchain();
  const { data: wordchainWinnersData } = useWordchainWinnersQuery({ limit: 1 });
  const { logClickEvent } = useEventLogger();

  const wordList = data?.wordList;
  const lastWord = data?.wordList[data?.wordList.length - 1]?.word;
  const lastUser = data?.wordList[data?.wordList.length - 1]?.user;
  const isGameStart = wordList?.length === 0 && data?.currentWinner === null;
  const status = isGameStart ? 'start' : 'progress';
  const lastWinner = wordchainWinnersData?.pages[0].winners[0];
  const isBanner = ADS && ADS.length > 0;

  return (
    <Container
      className={className}
      href={playgroundLink.wordchain()}
      onClick={() => logClickEvent('wordchainEntry')}
      isBanner={isBanner}
    >
      {isLoading || !wordList ? (
        <>
          <Responsive only='desktop' asChild>
            <WordchainSkeletonDesktop />
          </Responsive>
          <Responsive only='mobile' asChild>
            <WordchainSkeletonMobile />
          </Responsive>
        </>
      ) : (
        <>
          <LeftSection>
            {!isBanner && (
              <Responsive only='desktop'>
                <StyledIconMessageChat />
              </Responsive>
            )}
            <div style={{ width: '100%' }}>
              <TitleWrapper isBanner={isBanner}>
                <SwitchCase
                  value={status}
                  caseBy={{
                    start: (
                      <>
                        {!isBanner ? (
                          <>
                            <Responsive only='desktop'>
                              {lastWinner ? (
                                <StyledTitle>
                                  {lastWinner?.roomId}번째 우승자는
                                  <br />
                                  <LastWord>{lastWinner?.winner.name}</LastWord>님 입니다!
                                </StyledTitle>
                              ) : (
                                <StyledTitle>
                                  SOPT 회원들과 끝말잇기 할 사람,
                                  <br />
                                  지금이 바로 명예의 전당에 오를 기회!
                                </StyledTitle>
                              )}
                            </Responsive>
                            <MobileResponsive only='mobile'>
                              <GotoWordChainWrapper>
                                <GotoWordChainContents>
                                  <Flex align='center' style={{ gap: 4 }}>
                                    <StyledIconMessageChat />
                                    <GotoWordChainTitle>끝말잇기</GotoWordChainTitle>
                                  </Flex>
                                  {lastWinner ? (
                                    <GotoWordChainSub>
                                      이번 우승자는 <LastWord>{lastWinner?.winner.name}</LastWord>님 입니다! '
                                      {data.nextSyllable}'(으)로 시작하는 단어는?
                                    </GotoWordChainSub>
                                  ) : (
                                    <GotoWordChainSub>우승하고 명예의 전당에 올라가보세요!</GotoWordChainSub>
                                  )}
                                </GotoWordChainContents>
                                <div style={{ minWidth: 20 }}>
                                  <ArrowIcon width={20} height={20} />
                                </div>
                              </GotoWordChainWrapper>
                            </MobileResponsive>
                          </>
                        ) : (
                          <GotoWordChainWrapper isBanner={isBanner}>
                            <GotoWordChainContents isBanner={isBanner}>
                              <Flex align='center' style={{ gap: 4 }}>
                                <StyledIconMessageChat isBanner={isBanner} />
                                <GotoWordChainTitle>끝말잇기</GotoWordChainTitle>
                              </Flex>
                              {lastWinner ? (
                                <GotoWordChainSub>
                                  이번 우승자는 <LastWord>{lastWinner?.winner.name}</LastWord>님 입니다! '
                                  {data.nextSyllable}'(으)로 시작하는 단어는?
                                </GotoWordChainSub>
                              ) : (
                                <GotoWordChainSub>우승하고 명예의 전당에 올라가보세요!</GotoWordChainSub>
                              )}
                            </GotoWordChainContents>
                            <div style={{ minWidth: 20 }}>
                              <ArrowIcon width={20} height={20} />
                            </div>
                          </GotoWordChainWrapper>
                        )}
                      </>
                    ),
                    progress: (
                      <>
                        {!isBanner ? (
                          <>
                            <Responsive only='desktop'>
                              <StyledTitle>
                                현재 {`'${data?.currentWinner?.name}'`}님이 <br />
                                끝말잇기를 이기고 있어요!
                              </StyledTitle>
                            </Responsive>
                            <MobileResponsive only='mobile'>
                              <GotoWordChainWrapper>
                                <GotoWordChainContents>
                                  <Flex align='center' style={{ gap: 4 }}>
                                    <StyledIconMessageChat />
                                    <GotoWordChainTitle>끝말잇기</GotoWordChainTitle>
                                  </Flex>
                                  {lastWord != null && (
                                    <GotoWordChainSub>
                                      {`${data?.currentWinner?.name}`}님이 <LastWord>{data.nextSyllable}</LastWord>
                                      (으)로 끝냈어요. 끝말을 이어주세요!
                                    </GotoWordChainSub>
                                  )}
                                </GotoWordChainContents>
                                <div style={{ minWidth: 20 }}>
                                  <ArrowIcon width={20} height={20} />
                                </div>
                              </GotoWordChainWrapper>
                            </MobileResponsive>
                          </>
                        ) : (
                          <GotoWordChainWrapper isBanner={isBanner}>
                            <GotoWordChainContents isBanner={isBanner}>
                              <Flex align='center' style={{ gap: 4 }}>
                                <StyledIconMessageChat isBanner={isBanner} />
                                <GotoWordChainTitle>끝말잇기</GotoWordChainTitle>
                              </Flex>
                              {lastWord != null && (
                                <GotoWordChainSub>
                                  {`${data?.currentWinner?.name}`}님이 <LastWord>{data.nextSyllable}</LastWord>(으)로
                                  끝냈어요. 끝말을 이어주세요!
                                </GotoWordChainSub>
                              )}
                            </GotoWordChainContents>
                            <div style={{ minWidth: 20 }}>
                              <ArrowIcon width={20} height={20} />
                            </div>
                          </GotoWordChainWrapper>
                        )}
                      </>
                    ),
                  }}
                />
              </TitleWrapper>
              {!isBanner && (
                <Responsive only='desktop'>
                  <WordchainText>
                    {(lastWinner?.roomId ?? 0) + 1}번째 끝말잇기 우승자 도전하러 가기
                    <ArrowIcon />
                  </WordchainText>
                </Responsive>
              )}
            </div>
          </LeftSection>
          <RightSection isStart={status === 'start'}>
            {!isBanner && (
              <Responsive only='desktop'>
                <WordWrapper>
                  {status === 'start' && <WordchainMessage type='startWord' word={data.nextSyllable} />}
                  {lastUser && <WordchainMessage type='word' word={data.nextSyllable} user={lastUser} />}
                </WordWrapper>
              </Responsive>
            )}
          </RightSection>
        </>
      )}
    </Container>
  );
};

export default WordChainEntry;

const LoadingContainer = styled.div<{ isBanner?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 92px;

  ${({ isBanner }) =>
    isBanner &&
    css`
      height: 91.5px;
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    height: 91.5px;
  }
`;

const Container = styled(Link)<{ isBanner?: boolean }>`
  display: flex;
  justify-content: space-between;
  transition: background-color 0.2s;
  margin: 20px 0;
  border-radius: 14px;
  background-color: ${colors.gray900};
  padding: 36px;
  width: 100%;
  height: 100%;

  &:hover {
    background-color: ${colors.gray800};
  }

  ${({ isBanner }) =>
    isBanner &&
    css`
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0;
      border-radius: 0;
      background-color: ${colors.gray950};
      padding: 0;
      width: 100%;

      &:hover {
        background-color: transparent;
        cursor: default;
      }
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    border-radius: 0;
    background-color: ${colors.gray950};
    padding: 0;
    width: 100%;
  }
`;

const TitleWrapper = styled.div<{ isBanner?: boolean }>`
  white-space: nowrap;

  ${({ isBanner }) =>
    isBanner &&
    css`
      display: flex;
      gap: 4px;
      align-items: center;
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: 4px;
    align-items: center;
  }
`;

const StyledIconMessageChat = styled(IconMessageChat)<{ isBanner?: boolean }>`
  ${({ isBanner }) =>
    isBanner &&
    css`
      width: 20px;
      height: 20px;
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    width: 20px;
    height: 20px;
  }
`;

const LeftSection = styled.div<{ isBanner?: boolean }>`
  display: flex;
  gap: 12px;
  width: 100%;

  ${({ isBanner }) =>
    isBanner &&
    css`
      display: contents;
      gap: 0;
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    display: contents;
    gap: 0;
  }
`;

const StyledTitle = styled(Text)<{ isBanner?: boolean }>`
  display: block;
  ${fonts.HEADING_18_B}

  ${({ isBanner }) =>
    isBanner &&
    css`
      margin: 0;
      ${textStyles.SUIT_20_B};
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
    ${textStyles.SUIT_20_B};
  }
`;

const WordchainText = styled(Text)<{ isBanner?: boolean }>`
  display: flex;
  column-gap: 2px;
  align-items: center;
  margin-top: 20px;
  white-space: nowrap;
  ${fonts.LABEL_12_SB}

  ${({ isBanner }) =>
    isBanner &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      background-color: ${colors.gray800};
      padding: 14px 0;
      width: 100%;

      ${textStyles.SUIT_12_SB}
    `}


  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: ${colors.gray800};
    padding: 14px 0;
    width: 100%;

    ${textStyles.SUIT_12_SB}
  }
`;

const MobileResponsive = styled(Responsive)`
  width: 100%;
`;

const RightSection = styled.div<{ isStart: boolean; isBanner?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: ${({ isStart }) => (isStart ? 'flex-start' : 'flex-end')};
  width: 100%;

  ${({ isBanner }) =>
    isBanner &&
    css`
      gap: 10px;
      margin-top: 16px;
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 10px;
    margin-top: 16px;
  }
`;

const WordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 12px;
`;

const GotoWordChainWrapper = styled.aside<{ isBanner?: boolean }>`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s;
  border-radius: 12px;
  background-color: ${colors.gray900};
  padding: 16px;
  width: 100%;

  ${({ isBanner }) =>
    isBanner &&
    css`
      gap: 8px;
      border-radius: 14px;
      padding: 18px 17px;

      &:hover {
        background-color: ${colors.gray800};
        cursor: pointer;
      }
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 8px;
    border-radius: 14px;
    padding: 18px 17px;
  }
`;

const GotoWordChainContents = styled.div<{ isBanner?: boolean }>`
  display: flex;
  gap: 20px;

  ${({ isBanner }) =>
    isBanner &&
    css`
      gap: 16px;
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 16px;
  }
`;

const GotoWordChainTitle = styled.h1`
  ${textStyles.SUIT_16_B}
`;

const GotoWordChainSub = styled.div`
  ${textStyles.SUIT_14_R};

  white-space: normal;
  word-break: keep-all;
`;

const LastWord = styled.span`
  color: ${colors.yellow300};
`;

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={16} height={16} viewBox='0 0 16 16 ' fill='none' {...props}>
      <path d='M6 12L10 8L6 4' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
    </svg>
  );
}
