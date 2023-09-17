import { css, SerializedStyles } from '@emotion/react';
import { colors } from '@sopt-makers/colors';

export type ButtonStyle = 'default' | 'primary';
export type ButtonSize = 'small' | 'medium' | 'large';

export const buttonStyles: Record<ButtonStyle, SerializedStyles> = {
  default: css`
    background-color: #212121;
    color: ${colors.gray100};
  `,
  primary: css`
    transition: background-color 0.3s;
    background-color: ${colors.white100};
    color: ${colors.black100};

    &:hover,
    &:focus {
      background-color: ${colors.gray20};
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
