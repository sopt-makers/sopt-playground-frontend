import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import AuthRequired from '@/components/auth/AuthRequired';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { SMALL_MEDIA_QUERY } from '@/components/wordchain/mediaQuery';
import WordchainChatting from '@/components/wordchain/WordchainChatting';
import WordchainRules from '@/components/wordchain/WordchainRules';
import WordchainWinners from '@/components/wordchain/WordchainWinners';
import { useRunOnce } from '@/hooks/useRunOnce';
import IconArrow from '@/public/icons/icon-wordchain-arrow.svg';
import IconWordChainMessage from '@/public/icons/icon-wordchain-message.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { setLayout } from '@/utils/layout';

const WordchainPage = () => {
  const { logPageViewEvent } = useEventLogger();

  useRunOnce(() => {
    logPageViewEvent('wordchain');
  }, [logPageViewEvent]);

  return (
    <AuthRequired>
      <Container>
        <Responsive only='desktop'>
          <Title>
            <IconWordChainMessage /> SOPT와 함께하는 끝말잇기
          </Title>
          <Wrapper>
            <StyledWordchainChatting />
            <Sidebar>
              <RuleWrapper>
                <Text typography='SUIT_24_B'>끝말잇기 게임 규칙</Text>
                <WordchainRules
                  trigger={
                    <RuleTrigger>
                      <Text typography='SUIT_16_M'>상세 이용규칙 보기</Text>
                      <IconArrow />
                    </RuleTrigger>
                  }
                />
              </RuleWrapper>
              <WordchainWinners />
            </Sidebar>
          </Wrapper>
        </Responsive>

        <MobileResponsive only='mobile'>
          <Wrapper>
            <Title>
              <IconWordChainMessage /> SOPT와 함께하는 끝말잇기
            </Title>
            <WordchainRules
              trigger={
                <RuleTrigger>
                  <Text typography='SUIT_12_M'>상세 이용규칙 보기</Text>
                  <IconArrow />
                </RuleTrigger>
              }
            />
            <Divider />
            <WordchainWinners />
          </Wrapper>
          <StyledWordchainChatting />
        </MobileResponsive>
      </Container>
    </AuthRequired>
  );
};

export default WordchainPage;

setLayout(WordchainPage, 'headerFooter');

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  /* 세로 사이즈 */
  @media ${SMALL_MEDIA_QUERY} {
    padding: 20px 0;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 24px 0 0;
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  column-gap: 32px;
  margin-top: 40px;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    margin-top: 0;
    padding: 0 20px;
  }
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  align-self: flex-start;
  ${textStyles.SUIT_40_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_20_B};
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const RuleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  border-radius: 20px;
  background-color: ${colors.gray800};
  padding: 30px 38px;
`;

const RuleTrigger = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
  text-decoration: underline;
  color: ${colors.gray200};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 10px;
  }
`;

const Winners = styled.div`
  position: relative;
  border-radius: 20px;
  background-color: ${colors.gray800};
  padding: 28px;
  height: 100%;
  max-height: 380px;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 0;
    background-color: ${colors.gray950};
    padding: 20px;
    height: 59.5px;
  }
`;

const DimmedWinners = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  border-radius: 20px;
  background-color: ${colors.gray800};
  width: 100%;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 0;
    background-color: ${colors.gray950};
    padding: 20px;
    height: auto;
  }
`;

const StyledWordchainChatting = styled(WordchainChatting)``;

const MobileResponsive = styled(Responsive)`
  width: 100%;
`;

const Divider = styled.hr`
  margin: 24px 0 0;
  border: none;
  background-color: ${colors.gray700};
  width: 100%;
  height: 1.5px;
`;
