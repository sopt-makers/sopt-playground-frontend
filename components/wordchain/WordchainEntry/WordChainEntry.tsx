import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import { useGetRecentWordchain } from '@/api/endpoint/wordchain/getWordchain';
import Loading from '@/components/common/Loading';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import WordchainMessage from '@/components/wordchain/WordchainEntry/WordchainMessage';
import { playgroundLink } from '@/constants/links';
import IconArrow from '@/public/icons/icon-wordchain-arrow.svg';
import IconWordchainMessage from '@/public/icons/icon-wordchain-message.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface WordChainEntryProps {
  className?: string;
}

const WordChainEntry: FC<WordChainEntryProps> = ({ className }) => {
  const { data, isLoading } = useGetRecentWordchain();

  const words = data?.words;
  const lastWord = data?.words[data?.words.length - 1];
  const isGameStart = words?.length === 0 && data?.currentWinner === null;
  const status = isGameStart ? 'start' : 'progress';

  return (
    <Container className={className}>
      {(isLoading || !words) && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
      {words && (
        <>
          <LeftSection>
            <TitleWrapper>
              <StyledIconWordchainMessage />
              <StyledTitle>
                {status === 'start' && (
                  <>
                    SOPT 회원들과 끝말잇기 할 사람,
                    <br />
                    지금이 바로 명예의 전당에 오를 기회!
                  </>
                )}
                {status === 'progress' && (
                  <>
                    현재 {`'${data?.currentWinner?.name}'`}님이 <br />
                    끝말잇기를 이기고 있어요!
                  </>
                )}
              </StyledTitle>
            </TitleWrapper>
            <Responsive only='desktop'>
              <WordchainLink href={playgroundLink.wordchain()}>
                SOPT 회원들과 끝말잇기 하러 가기
                <IconArrow />
              </WordchainLink>
            </Responsive>
          </LeftSection>
          <RightSection>
            <Responsive only='desktop'>
              <WordWrapper>
                {status === 'start' && <WordchainMessage type='startWord' word={data.startWord} />}
                {words.map(({ word, user }, index) => (
                  <WordchainMessage key={index} type='word' word={word} user={user} />
                ))}
              </WordWrapper>
            </Responsive>
            <Responsive only='mobile'>
              {status === 'progress' && lastWord && (
                <WordchainMessage type='word' word={lastWord.word} user={lastWord.user} />
              )}
              {status === 'start' && <WordchainMessage type='startWord' word={data.startWord} />}
            </Responsive>
            <WordchainMessage type='helper' word={`'${data.nextSyllable}'(으)로 시작하는 단어는?`} />
          </RightSection>
          <MobileResponsive only='mobile'>
            <WordchainLink href={playgroundLink.wordchain()}>
              SOPT 회원들과 끝말잇기 하러 가기
              <IconArrow />
            </WordchainLink>
          </MobileResponsive>
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
  height: 170px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 16px;
  background-color: ${colors.black90};
  padding: 39px 45px 39px 70px;
  width: 100%;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
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

const WordchainLink = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin-top: 16px;
  ${textStyles.SUIT_16_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: ${colors.black90};
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
`;
