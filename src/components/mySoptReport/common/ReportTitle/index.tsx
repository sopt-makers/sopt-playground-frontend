import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { ReactNode } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ReportTitleProps {
  color: string;
  subTitle: ReactNode;
  title: ReactNode;
}

export default function ReportTitle({ color, subTitle, title }: ReportTitleProps) {
  return (
    <ReportTitleWrapper>
      <SubTitle color={color}>{subTitle}</SubTitle>
      <MainTitle>{title}</MainTitle>
    </ReportTitleWrapper>
  );
}

const ReportTitleWrapper = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin-bottom: 40px;
  padding-top: 52px;
`;

const SubTitle = styled.p<{ color: string }>`
  color: ${(props) => props.color};
  ${fonts.TITLE_24_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.TITLE_18_SB};
  }
`;

const MainTitle = styled.h1`
  line-height: 60px; /* 150% */
  letter-spacing: -0.8px;
  color: ${colors.white};
  font-family: SUIT, sans-serif;
  font-size: 40px;
  font-weight: 700;
  font-style: normal;

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_28_B};
  }
`;
