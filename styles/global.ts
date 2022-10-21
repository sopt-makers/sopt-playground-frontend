import { css } from '@emotion/react';

import { colors } from '@/styles/colors';
import font from '@/styles/font';
import { reset } from '@/styles/reset';

export const global = css`
  ${reset};
  ${font}

  html,
  body {
    background-color: ${colors.black100};
    color: ${colors.white};
  }
`;
