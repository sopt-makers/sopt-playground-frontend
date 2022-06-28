import { css } from '@emotion/react';
import { colors } from '@/styles/colors';
import { reset } from '@/styles/reset';
import font from '@/styles/font';

export const global = css`
  ${reset};
  ${font}

  html,
  body {
    background-color: ${colors.black100};
    color: ${colors.white};
  }
`;
