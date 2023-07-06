import styled from '@emotion/styled';

import AuthRequired from '@/components/auth/AuthRequired';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { SMALL_MEDIA_QUERY } from '@/components/wordchain/mediaQuery';
import WordchainChatting from '@/components/wordchain/WordchainChatting';
import WordchainRules from '@/components/wordchain/WordchainRules';
import { useRunOnce } from '@/hooks/useRunOnce';
import IconArrow from '@/public/icons/icon-wordchain-arrow.svg';
import IconWordChainMessage from '@/public/icons/icon-wordchain-message.svg';
import { colors } from '@/styles/colors';
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
              <Winners>
                <DimmedWinners>
                  <Text as='h2' typography='SUIT_20_B'>
                    아직 준비 중인 기능이에요 🛠️
                  </Text>
                </DimmedWinners>
                <Text as='h2' typography='SUIT_20_B'>
                  👑 역대 우승자 명예의 전당 👑
                </Text>
              </Winners>
            </Sidebar>
          </Wrapper>
        </Responsive>

        <MobileResponsive only='mobile'>
          <MobileNotSupportedText as='h2' typography='SUIT_15_B'>
            현재는 PC에서만 이용 가능해요.
            <br /> 모바일은 곧 지원할 예정이에요.
          </MobileNotSupportedText>

          {/* TODO: 모바일은 추후 대응하기로 함.
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
            <Winners>
              <DimmedWinners>
                <Text as='h2' typography='SUIT_15_B'>
                  아직 준비 중인 기능이에요 🛠️
                </Text>
              </DimmedWinners>
              <Text as='h2' typography='SUIT_14_B'>
                👑 역대 우승자 명예의 전당 👑
              </Text>
            </Winners>
            TODO: mobile <StyledWordchainChatting/>
          </Wrapper> */}
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
  background-color: ${colors.black80};
  padding: 30px 38px;
`;

const RuleTrigger = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
  text-decoration: underline;
  color: ${colors.gray40};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 10px;
  }
`;

const Winners = styled.div`
  position: relative;
  border-radius: 20px;
  background-color: ${colors.black80};
  padding: 28px;
  height: 100%;
  max-height: 380px;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 0;
    background-color: ${colors.black100};
    padding: 20px;
    height: 44px;
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
  background-color: ${colors.black80};
  width: 100%;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 0;
    background-color: ${colors.black100};
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
  background-color: ${colors.black60};
  width: 100%;
  height: 1.5px;
`;

const MobileNotSupportedText = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  text-align: center;
`;
