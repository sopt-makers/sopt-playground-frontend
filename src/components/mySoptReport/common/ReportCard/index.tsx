import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ReactNode } from 'react';

interface ReportCardProp {
  children: ReactNode;
}

export default function ReportCard({ children }: ReportCardProp) {
  return <CardWrapper>{children}</CardWrapper>;
}

const CardWrapper = styled.section`
  border-radius: 14px;
  background-color: ${colors.gray800};
  padding: 24px;
`;
