import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface ValueDescriptionProps {
  subTitle: ReactNode;
  description: ReactNode;
}

const ValueDescription: FC<ValueDescriptionProps> = ({ subTitle, description }) => {
  return (
    <Container>
      <Line />
      <SubTitle>{subTitle}</SubTitle>
      <Description>{description}</Description>
    </Container>
  );
};

export default ValueDescription;

const Container = styled.div`
  display: grid;
  grid:
    'line subtitle' auto
    'line description' auto
    / 30px 1fr;
  margin-bottom: 40px;
`;

const Line = styled.div`
  grid-area: line;
  background-color: ${colors.white};
  width: 1px;
  height: 100%;
`;

const SubTitle = styled.div`
  grid-area: subtitle;
  align-self: end;
  margin-top: 30px;

  ${textStyles.SUIT_18_SB};
`;

const Description = styled.div`
  grid-area: description;
  margin-top: 10px;
  margin-bottom: 20px;
  white-space: pre-wrap;

  ${textStyles.SUIT_40_SB};
`;
