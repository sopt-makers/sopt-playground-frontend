import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { ReactNode } from 'react';

interface ReportTextProps {
  color?: keyof typeof colors | string;
  children: ReactNode;
  type?: 'normal' | 'big' | 'label' | 'description';
}

export default function ReportText({ color = 'white', children, type = 'normal' }: ReportTextProps) {
  return (
    <>
      {type === 'big' ? (
        <BigText color={color}>{children}</BigText>
      ) : type === 'description' ? (
        <DescriptionText color={color}>{children}</DescriptionText>
      ) : type === 'normal' ? (
        <Title color={color}>{children}</Title>
      ) : (
        <LabelText>{children}</LabelText>
      )}
    </>
  );
}

const LabelText = styled.p`
  float: right;
  color: ${colors.gray300};
  ${fonts.LABEL_12_SB};
`;

const Title = styled.h2<{ color: keyof typeof colors | string }>`
  display: flex;
  color: ${(props) => (props.color in colors ? colors[props.color as keyof typeof colors] : props.color)};
  ${fonts.TITLE_20_SB};
`;

const DescriptionText = styled.h2<{ color: keyof typeof colors | string }>`
  display: flex;
  color: ${(props) => (props.color in colors ? colors[props.color as keyof typeof colors] : props.color)};
  ${fonts.BODY_16_M};
`;

const BigText = styled.h2<{ color: keyof typeof colors | string }>`
  line-height: 60px; /* 111.111% */
  letter-spacing: -1.08px;
  color: ${(props) => (props.color in colors ? colors[props.color as keyof typeof colors] : props.color)};
  font-family: SUIT, sans-serif;
  font-size: 54px;
  font-weight: 700;
  font-style: normal;
`;
