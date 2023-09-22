import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC, ReactNode } from 'react';

import { textStyles } from '@/styles/typography';

interface ValueDescriptionProps {
  subTitle: ReactNode;
  description: ReactNode;
  color: string;
}

const ValueDescription: FC<ValueDescriptionProps> = ({ subTitle, description, color }) => {
  return (
    <Container>
      <Line color={color} />
      <SubTitle color={color}>{subTitle}</SubTitle>
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
  background: ${(props) => props.color};
  background: linear-gradient(
    0deg,
    ${(props) => props.color}00 0%,
    ${(props) => props.color} 50%,
    ${(props) => props.color}00 100%
  );
  width: 1px;
  height: 100%;
`;

const SubTitle = styled.div`
  grid-area: subtitle;
  align-self: end;
  margin-top: 30px;
  color: ${(props) => props.color};

  ${textStyles.SUIT_18_SB};
`;

const Description = styled.div`
  grid-area: description;
  margin-top: 10px;
  margin-bottom: 20px;
  white-space: pre-wrap;

  ${textStyles.SUIT_40_SB};
`;
