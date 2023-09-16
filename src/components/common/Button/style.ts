import { css, SerializedStyles } from '@emotion/react';

import { legacyColors } from '@/styles/colors';

export type ButtonStyle = 'default' | 'primary' | 'danger';
export type ButtonSize = 'fill' | 'small' | 'medium' | 'large';

export const buttonStyles: Record<ButtonStyle, SerializedStyles> = {
  default: css`
    background-color: #212121;
    color: ${legacyColors.gray100};
  `,
  primary: css`
    background-color: ${legacyColors.purple100};
    color: #e2e2e2;
  `,
  danger: css`
    background-color: ${legacyColors.red100};
    color: ${legacyColors.gray40};
  `,
};

export const buttonSize: Record<ButtonSize, SerializedStyles> = {
  fill: css`
    width: auto;
    height: auto;
  `,
  small: css``,
  medium: css`
    padding: 14px 0;
    width: 163px;
    height: 42px;
  `,
  large: css``,
};
