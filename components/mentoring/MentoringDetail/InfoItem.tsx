import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { colors } from '@/styles/colors';
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
  gap: 12px;
`;

const Label = styled.div`
  line-height: 100%;
  color: ${colors.white};

  ${textStyles.SUIT_24_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_B};
  }
`;
