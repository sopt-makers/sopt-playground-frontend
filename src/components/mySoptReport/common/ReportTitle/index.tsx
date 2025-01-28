import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { ReactNode } from 'react';

interface ReportTitleProps {
  color: keyof typeof colors;
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
`;

const SubTitle = styled.p<{ color: keyof typeof colors }>`
  color: ${(props) => colors[props.color]};
  ${fonts.TITLE_18_SB};
`;

const MainTitle = styled.h1`
  color: ${colors.white};
  ${fonts.HEADING_28_B};
`;
