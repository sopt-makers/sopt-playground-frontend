import { css } from '@emotion/react';
import { colors } from '@sopt-makers/colors';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export const cardStyle = css`
  border-radius: 30px;
  background-color: ${colors.gray800};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 12px;
  }
`;
