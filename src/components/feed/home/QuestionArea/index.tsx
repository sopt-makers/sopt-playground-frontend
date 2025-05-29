import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useRouter } from 'next/router';

import { useWaitingQuestions } from '@/api/endpoint/feed/getWaitingQuestions';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import Text from '@/components/common/Text';
import { QUESTION_CATEGORY_ID } from '@/components/feed/constants';
import QuestionCard from '@/components/feed/home/QuestionArea/QuestionCard';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const QuestionArea = () => {
  const { data: me } = useGetMemberOfMe();
  const { data: questions, isLoading } = useWaitingQuestions();
  const router = useRouter();

  const navigateToQuestion = () => {
    router.push(`/?category=${QUESTION_CATEGORY_ID}`);
  };

  return (
    <Container>
      <TitleBox>
        <Title>
          <UserNameStyle>{me?.name}</UserNameStyle>님의
          <MobileLineBreak /> 답변을 기다리고 있는 질문이에요
        </Title>
        <AllBtn onClick={navigateToQuestion}>전체보기</AllBtn>
      </TitleBox>

      <QuestionFeedList>
        {!isLoading && questions?.map((question) => <QuestionCard key={question.id} question={question} />)}
      </QuestionFeedList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
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
  margin: 0 -16px -18px;
  padding: 0 16px;
  overflow-x: auto;

  ::-webkit-scrollbar-track {
    margin: 0 16px;
  }

  /* 스크롤바 전체 */
  ::-webkit-scrollbar {
    width: 12px;
    height: 18px;
  }

  ::-webkit-scrollbar-thumb {
    border: 6px solid transparent;
    border-radius: 10px;
    background-clip: padding-box;
    background-color: ${colors.gray400};
    cursor: pointer;
  }
`;

export default QuestionArea;
