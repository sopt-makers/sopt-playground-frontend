import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { ReactNode } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ReportTextProps {
  color?: keyof typeof colors | string;
  children: ReactNode;
  type?: 'normal' | 'big' | 'label' | 'description' | 'small';
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
      ) : type === 'small' ? (
        <LabelSmallText>{children}</LabelSmallText>
      ) : (
        <LabelText>{children}</LabelText>
      )}
    </>
  );
}

const LabelSmallText = styled.p`
  float: right;
  color: ${colors.gray300};
  ${fonts.LABEL_11_SB};
`;

const LabelText = styled.p`
  float: right;
  color: ${colors.gray300};
  ${fonts.LABEL_12_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.LABEL_16_SB};
  }
`;

const Title = styled.h2<{ color: keyof typeof colors | string }>`
  display: flex;
  color: ${(props) => (props.color in colors ? colors[props.color as keyof typeof colors] : props.color)};
  ${fonts.TITLE_24_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.TITLE_20_SB};
  }
`;

const DescriptionText = styled.h2<{ color: keyof typeof colors | string }>`
  display: flex;
  color: ${(props) => (props.color in colors ? colors[props.color as keyof typeof colors] : props.color)};
  ${fonts.BODY_16_M};
`;

const BigText = styled.h2<{ color: keyof typeof colors | string }>`
  min-width: max-content;
  line-height: 86px; /* 119.444% */
  letter-spacing: -1.44px;
  color: ${(props) => (props.color in colors ? colors[props.color as keyof typeof colors] : props.color)};
  font-family: SUIT, sans-serif;
  font-size: 72px;
  font-weight: 700;
  font-style: normal;

  @media ${MOBILE_MEDIA_QUERY} {
    line-height: 60px; /* 111.111% */
    letter-spacing: -1.08px;
    font-family: SUIT, sans-serif;
    font-size: 54px;
    font-weight: 700;
    font-style: normal;
  }
`;
