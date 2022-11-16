import { css } from '@emotion/react';

import { colors } from '@/styles/colors';
import font from '@/styles/font';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { reset } from '@/styles/reset';

export const global = css`
  ${reset};
  ${font}

  html,
  body {
    background-color: ${colors.black100};
    padding-top: 40px;

    .pc-only {
      @media ${MOBILE_MEDIA_QUERY} {
        display: none;
      }
    }

    .mobile-only {
      display: none;
      @media ${MOBILE_MEDIA_QUERY} {
        display: block;
      }
    }

    @media ${MOBILE_MEDIA_QUERY} {
      padding-top: 30px;
    }
  }
`;
