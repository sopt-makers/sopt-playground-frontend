import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import Text from '@/components/common/Text';
import QuestionCard from '@/components/feed/home/QuestionArea/QuestionCard';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const QuestionArea = () => {
  const userName = '문성희';
  return (
    <Container>
      <TitleBox>
        <Title>
          <UserNameStyle>{userName}</UserNameStyle>님의
          <MobileLineBreak />
          답변을 기다리고 있는 질문이에요
        </Title>
        <AllBtn>전체보기</AllBtn>
      </TitleBox>

      <QuestionFeedList>
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
      </QuestionFeedList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled(Text)`
  ${fonts.HEADING_18_B};

  word-break: keep-all;
`;

const MobileLineBreak = styled.br`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: inline;
  }
`;

const UserNameStyle = styled.span`
  color: ${colors.secondary};
`;

const AllBtn = styled.button`
  ${fonts.LABEL_12_SB};

  color: ${colors.gray400};
`;

const QuestionFeedList = styled.div`
  display: flex;
  gap: 12px;
  padding-bottom: 4px;
  overflow-x: auto;
`;

export default QuestionArea;
