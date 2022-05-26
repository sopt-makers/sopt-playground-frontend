import { css } from '@emotion/react';
import { colors } from 'styles/common/colors';
import { reset } from 'styles/common/reset';

export const global = css`
  ${reset};

  html,
  body {
    background-color: ${colors.black100};
    color: ${colors.white};
  }
`;
