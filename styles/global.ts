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

    /* Change Autocomplete styles in Chrome */
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      transition: background-color 5000s ease-in-out 0s;
      box-shadow: 0 0 0 1000px ${colors.black80} inset;
      -webkit-text-fill-color: ${colors.white};
    }

    @media ${MOBILE_MEDIA_QUERY} {
      padding-top: 30px;
    }
  }
`;
