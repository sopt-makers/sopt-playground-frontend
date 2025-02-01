import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { ReactNode } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface LabelButtonProp {
  children: ReactNode;
}

export default function LabelButton({ children }: LabelButtonProp) {
  return <Label>{children}</Label>;
}

const Label = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  align-self: stretch;
  justify-content: center;
  margin: 40px 0 -6px;
  border-radius: 100px;
  background-color: ${colors.blue400};
  padding: 3px 12px;

  ${fonts.TITLE_20_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.TITLE_18_SB};
  }
`;
