import { css, SerializedStyles } from '@emotion/react';
import { colors } from 'styles/common/colors';

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
    padding: 20px 0;
    width: 237px;
    height: 62px;
  `,
  large: css``,
};
