import '@sopt-makers/ui/dist/index.css';

import { css } from '@emotion/react';
import { colors } from '@sopt-makers/colors';
import { fontBase } from '@sopt-makers/fonts';

import font from '@/styles/font';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { reset } from '@/styles/reset';

export const global = css`
  ${reset};
  ${font}

  * {
    ${fontBase}
  }

  :root {
    color-scheme: dark;
  }

  html,
  body {
    background-color: ${colors.gray950};

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

    /* Remove Arrows/Spinners Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }

    /* Remove Arrows/Spinners Firefox */
    input[type='number'] {
      appearance: textfield;
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
      box-shadow: 0 0 0 1000px ${colors.gray800} inset;
      -webkit-text-fill-color: ${colors.gray10};
    }
  }

  button {
    cursor: pointer;
  }
`;
