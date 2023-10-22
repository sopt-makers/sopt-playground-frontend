import { css, SerializedStyles } from '@emotion/react';
import { colors } from '@sopt-makers/colors';

export type ButtonStyle = 'default' | 'primary';
export type ButtonSize = 'small' | 'medium' | 'large';

export const buttonStyles: Record<ButtonStyle, SerializedStyles> = {
  default: css`
    background-color: #212121;
    color: ${colors.gray500};
  `,
  primary: css`
    transition: background-color 0.3s;
    background-color: ${colors.gray10};
    color: ${colors.gray900};

    &:hover,
    &:focus {
      background-color: ${colors.gray50};
    }
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
