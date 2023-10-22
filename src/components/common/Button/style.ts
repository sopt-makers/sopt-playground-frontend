import { css, SerializedStyles } from '@emotion/react';
import { colors } from '@sopt-makers/colors';

export type ButtonStyle = 'default' | 'primary' | 'danger';
export type ButtonSize = 'fill' | 'small' | 'medium' | 'large';

export const buttonStyles: Record<ButtonStyle, SerializedStyles> = {
  default: css`
    background-color: #212121;
    color: ${colors.gray500};
  `,
  primary: css`
    background-color: ${colors.gray10};
    color: ${colors.gray900};
  `,
  danger: css`
    background-color: ${colors.error};
    color: ${colors.gray200};
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
