import { css } from '@emotion/react';

import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export const cardStyle = css`
  border-radius: 30px;
  background-color: ${legacyColors.black80};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 12px;
  }
`;
