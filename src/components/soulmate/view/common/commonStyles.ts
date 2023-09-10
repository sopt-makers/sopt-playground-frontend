import { css } from '@emotion/react';

import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export const cardStyle = css`
  border-radius: 30px;
  background-color: ${colors.black80};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 12px;
  }
`;
