import styled from '@emotion/styled';

import AuthRequired from '@/components/auth/AuthRequired';
import Text from '@/components/common/Text';
import WordchainChatting from '@/components/wordchain/WordchainChatting';
import WordchainRules from '@/components/wordchain/WordchainRules';
import IconArrow from '@/public/icons/icon-wordchain-arrow.svg';
import { colors } from '@/styles/colors';
import { setLayout } from '@/utils/layout';

const WordchainPage = () => {
  return (
    <AuthRequired>
      <Container>
        <Wrapper>
          <Title>💬 SOPT와 함께하는 끝말잇기</Title>
          <StyledWordchainChatting />
          <Sidebar>
            <WordchainRules
              trigger={
                <RuleTrigger>
                  <Text typography='SUIT_16_M'>상세 이용규칙 펼쳐보기</Text>
                  <IconArrow />
                </RuleTrigger>
              }
            />
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
      </Container>
    </AuthRequired>
  );
};

export default WordchainPage;

setLayout(WordchainPage, 'headerFooter');

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 80px 0;
  width: 100%;
`;

const Wrapper = styled.div`
  display: grid;
  grid:
    [row1-start] 'title title' min-content [row1-end]
    [row2-start] 'wordchainChatting sidebar' 728px [row2-end]
    / 790px 324px;
  gap: 40px 32px;
`;

const Title = styled.h1`
  grid-area: title;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  grid-area: sidebar;
  row-gap: 32px;
`;

const RuleTrigger = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  text-decoration: underline;
  color: ${colors.gray40};
`;

const Winners = styled.div`
  position: relative;
  border-radius: 20px;
  background-color: ${colors.black80};
  padding: 28px;
  height: 380px;
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
  height: 380px;
`;

const StyledWordchainChatting = styled(WordchainChatting)`
  grid-area: wordchainChatting;
`;
