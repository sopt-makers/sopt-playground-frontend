import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import Text from '@/components/common/Text';
import FeedIcon from '@/components/feed/home/QuestionArea/FeedIcon';

const QuestionCard = () => {
  const createdDate = '1일전';
  return (
    <CardContainer>
      <CardContent>
        <TitleStyle>커피솝으로 커피챗 진행해보신 분 계신가요..?커피솝으로 커피챗 진행해보신 분 계신가요..?</TitleStyle>
        <ContentStyle>
          후기 어땠는지 궁금합니당!! 개발을 시작한지 얼마 안 돼서 깊은 질문은 못 드릴 거 같은커피솝으로 커피챗
          진행해보신 분 계신가요..?
        </ContentStyle>
      </CardContent>

      <CardFooter>
        <CreatedDate>{createdDate}</CreatedDate>
        <FeedIconBox>
          <FeedIcon type='thumbsUp' count={0} />
          <FeedIcon type='message' count={0} />
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
