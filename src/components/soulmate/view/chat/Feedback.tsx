import styled from '@emotion/styled';
import { FC } from 'react';

import SoulmateIconHeart from '@/components/soulmate/icons/SoulmateIconHeart';
import { legacyColors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface FeedbackProps {}

const Feedback: FC<FeedbackProps> = ({}) => {
  return (
    <Container>
      <Title>소울메이트 사용 후기 보내기</Title>
      <Description>솔직한 후기를 기다리고 있어요!</Description>
      <IconBox>
        <SoulmateIconHeart />
      </IconBox>
      <FeedbackButton href='#' target='_blank'>
        후기 보내기
      </FeedbackButton>
    </Container>
  );
};

export default Feedback;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  ${textStyles.SUIT_20_SB}
`;

const Description = styled.div`
  margin-top: 12px;
  color: ${legacyColors.gray40};

  ${textStyles.SUIT_16_M};
`;

const IconBox = styled.div`
  align-self: center;
  margin-top: 28px;
  width: 55px;
  height: 55px;
`;

const FeedbackButton = styled.a`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  border-radius: 10px;
  background-color: ${legacyColors.black60};
  padding: 20px;
`;
