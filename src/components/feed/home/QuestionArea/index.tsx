import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useRouter } from 'next/router';

import { useWaitingQuestions } from '@/api/endpoint/feed/getWaitingQuestions';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import Text from '@/components/common/Text';
import { QUESTION_CATEGORY_ID } from '@/components/feed/constants';
import QuestionCard from '@/components/feed/home/QuestionArea/QuestionCard';
import FeedSkeleton from '@/components/feed/list/FeedSkeleton';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const QuestionArea = () => {
  const { data: me } = useGetMemberOfMe();
  const { data: questions, isLoading, isError } = useWaitingQuestions();
  const router = useRouter();

  const navigateToQuestion = () => {
    router.push(`/?category=${QUESTION_CATEGORY_ID}`);
  };

  return (
    <>
      {isError && (
        <Text
          typography='SUIT_14_M'
          color={colors.gray300}
          lineHeight={16}
          style={{ textAlign: 'center', padding: '80px' }}
        >
          답변을 기다리고 있는 질문을 보여주는데 문제가 발생했어요.
        </Text>
      )}
      {isLoading ? (
        <FeedSkeleton count={1} />
      ) : (
        <Container>
          <TitleBox>
            <Title>
              <UserNameStyle>{me?.name}</UserNameStyle>님의
              <MobileLineBreak /> 답변을 기다리고 있는 질문이에요
            </Title>
            <AllBtn onClick={navigateToQuestion}>전체보기</AllBtn>
          </TitleBox>

          <QuestionFeedList>
            {questions?.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </QuestionFeedList>
        </Container>
      )}
    </>
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

  @media ${MOBILE_MEDIA_QUERY} {
    align-items: flex-end;
  }
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
  line-height: 20px;
  color: ${colors.gray400};
  ${fonts.LABEL_12_SB};

  &:hover {
    box-shadow: inset 0 -1px 0 0 ${colors.gray400};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding-bottom: 4px;
  }
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
