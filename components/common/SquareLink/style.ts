import { css, SerializedStyles } from '@emotion/react';
import { colors } from '@/styles/colors';

export type ButtonStyle = 'default' | 'primary';
export type ButtonSize = 'small' | 'medium' | 'large';

export const buttonStyles: Record<ButtonStyle, SerializedStyles> = {
  default: css`
    background-color: #212121;
    color: ${colors.gray100};
  `,
  primary: css`
    background-color: ${colors.purple100};
    color: #e2e2e2;
  `,
};

export const buttonSize: Record<ButtonSize, SerializedStyles> = {
  small: css``,
  medium: css`
    padding: 14px 0;
    height: 48px;
  `,
  large: css``,
};
