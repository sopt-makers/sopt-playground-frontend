import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Link from 'next/link';
import { FC } from 'react';

import { useGetEntryWordchain } from '@/api/endpoint/wordchain/getWordchain';
import Loading from '@/components/common/Loading';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import WordchainMessage from '@/components/wordchain/WordchainEntry/WordchainMessage';
import { playgroundLink } from '@/constants/links';
import IconArrowMobile from '@/public/icons/icon-chevron-right.svg';
import IconArrow from '@/public/icons/icon-wordchain-arrow.svg';
import IconWordchainMessage from '@/public/icons/icon-wordchain-message.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { SwitchCase } from '@/utils/components/switch-case/SwitchCase';

interface WordChainEntryProps {
  className?: string;
}

const WordChainEntry: FC<WordChainEntryProps> = ({ className }) => {
  const { data, isLoading } = useGetEntryWordchain();
  const { logClickEvent } = useEventLogger();

  const wordList = data?.wordList;
  const lastWord = data?.wordList[data?.wordList.length - 1]?.word;
  const isGameStart = wordList?.length === 0 && data?.currentWinner === null;
  const status = isGameStart ? 'start' : 'progress';

  return (
    <Container className={className} href={playgroundLink.wordchain()} onClick={() => logClickEvent('wordchainEntry')}>
      {(isLoading || !wordList) && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
      {wordList && (
        <>
          <LeftSection>
            <TitleWrapper>
              <Responsive only='desktop'>
                <StyledIconWordchainMessage />
              </Responsive>
              <SwitchCase
                value={status}
                caseBy={{
                  start: (
                    <>
                      <Responsive only='desktop'>
                        <StyledTitle>
                          SOPT 회원들과 끝말잇기 할 사람,
                          <br />
                          지금이 바로 명예의 전당에 오를 기회!
                        </StyledTitle>
                      </Responsive>
                      <MobileResponsive only='mobile'>
                        <GotoWordChainWrapper>
                          <GotoWordChainContents>
                            <GotoWordChainTitle>끝말잇기</GotoWordChainTitle>
                            <GotoWordChainSub>우승하고 명예의 전당에 올라가보세요!</GotoWordChainSub>
                          </GotoWordChainContents>
                          <IconArrowMobile />
                        </GotoWordChainWrapper>
                      </MobileResponsive>
                    </>
                  ),
                  progress: (
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
                            <GotoWordChainTitle>끝말잇기</GotoWordChainTitle>
                            {lastWord != null && (
                              <GotoWordChainSub>
                                {`${data?.currentWinner?.name}`}님이 <LastWord>{lastWord}</LastWord>(으)로 이었어요.
                                끝말을 이어주세요!
                              </GotoWordChainSub>
                            )}
                          </GotoWordChainContents>
                          <IconArrowMobile />
                        </GotoWordChainWrapper>
                      </MobileResponsive>
                    </>
                  ),
                }}
              />
            </TitleWrapper>
            <Responsive only='desktop'>
              <WordchainText>
                SOPT 회원들과 끝말잇기 하러 가기
                <IconArrow />
              </WordchainText>
            </Responsive>
          </LeftSection>
          <RightSection>
            <Responsive only='desktop'>
              <WordWrapper>
                {status === 'start' && <WordchainMessage type='startWord' word={data.startWord} />}
                {wordList.map(({ word, user }, index) => (
                  <WordchainMessage key={index} type='word' word={word} user={user} />
                ))}
              </WordWrapper>
              <WordchainMessage type='helper' word={`'${data.nextSyllable}'(으)로 시작하는 단어는?`} />
            </Responsive>
          </RightSection>
        </>
      )}
    </Container>
  );
};

export default WordChainEntry;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 163px;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 91.5px;
  }
`;

const Container = styled(Link)`
  display: flex;
  justify-content: space-between;
  border-radius: 16px;
  background-color: ${colors.black80};
  padding: 39px 45px 39px 70px;
  width: 100%;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    background-color: ${colors.black100};
    padding: 0 20px;
    width: 100%;
  }
`;

const TitleWrapper = styled.div`
  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: 4px;
    align-items: center;
  }
`;

const StyledIconWordchainMessage = styled(IconWordchainMessage)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 40px;
    height: 40px;
  }
`;

const LeftSection = styled.div`
  width: 100%;
`;

const StyledTitle = styled(Text)`
  display: block;
  margin-top: 8px;
  ${textStyles.SUIT_24_B};

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
    ${textStyles.SUIT_20_B};
  }
`;

const WordchainText = styled(Text)`
  display: flex;
  column-gap: 8px;
  align-items: center;
  margin-top: 16px;
  ${textStyles.SUIT_16_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: ${colors.black80};
    padding: 14px 0;
    width: 100%;

    ${textStyles.SUIT_12_SB}
  }
`;

const MobileResponsive = styled(Responsive)`
  width: 100%;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: flex-end;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 10px;
    margin-top: 16px;
  }
`;

const WordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
`;

const GotoWordChainWrapper = styled.aside`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background-color: ${colors.black80};
  padding: 16px;
`;

const GotoWordChainContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const GotoWordChainTitle = styled.h1`
  ${textStyles.SUIT_16_B}
`;

const GotoWordChainSub = styled.div`
  margin-top: 6px;

  ${textStyles.SUIT_14_R};
`;

const LastWord = styled.span`
  margin-left: 4px;
  color: ${colors.orange100};
`;
