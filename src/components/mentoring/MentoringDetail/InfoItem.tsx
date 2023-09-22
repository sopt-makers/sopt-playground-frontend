import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ReactNode } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface InfoItemProps {
  label: string;
  children: ReactNode;
}

export default function InfoItem({ label, children }: InfoItemProps) {
  return (
    <Container>
      <Label>{label}</Label>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
  }
`;

const Label = styled.div`
  line-height: 100%;
  color: ${colors.white100};

  ${textStyles.SUIT_24_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_B};
  }
`;
