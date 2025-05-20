import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useRouter } from 'next/router';

import { WaitingQuestion } from '@/api/endpoint/feed/getWaitingQuestions';
import Text from '@/components/common/Text';
import { QUESTION_CATEGORY_ID } from '@/components/feed/constants';
import FeedIcon from '@/components/feed/home/QuestionArea/FeedIcon';

interface QuestionCardProps {
  question: WaitingQuestion;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const { id, title, content, createdAt, likeCount, commentCount } = question;
  const router = useRouter();

  const handleClickCard = () => {
    router.push(`/?category=${QUESTION_CATEGORY_ID}&feed=${id}`);
  };

  return (
    <CardContainer onClick={handleClickCard}>
      <CardContent>
        <TitleStyle>{title}</TitleStyle>
        <ContentStyle>{content}</ContentStyle>
      </CardContent>

      <CardFooter>
        <CreatedDate>{createdAt}</CreatedDate>
        <FeedIconBox>
          <FeedIcon type='thumbsUp' count={likeCount} />
          <FeedIcon type='message' count={commentCount} />
        </FeedIconBox>
      </CardFooter>
    </CardContainer>
  );
};

export default QuestionCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 12px;
  border-radius: 12px;
  background-color: ${colors.gray900};
  padding: 16px;
  width: 272px;
  height: 158px;

  &:first-of-type {
    margin-left: 16px;
  }

  &:last-of-type {
    margin-right: 16px;
  }

  &:hover {
    background-color: ${colors.gray800};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 240px;
  height: 96px;
`;

const TitleStyle = styled(Text)`
  ${fonts.TITLE_16_SB}

  height: 48px;
  /* stylelint-disable */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentStyle = styled(Text)`
  ${fonts.BODY_14_L}

  display: -webkit-box;
  height: 48px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.gray400};
`;

const FeedIconBox = styled.div`
  display: flex;
  gap: 16px;
`;

const CreatedDate = styled(Text)`
  color: ${colors.gray400};
  ${fonts.LABEL_14_SB}
`;
