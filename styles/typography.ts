import { css, SerializedStyles } from '@emotion/react';

export const baseTextStyles = css`
  letter-spacing: -0.01em;
`;

export type Typography =
  | 'SUIT_20_SM'
  | 'SUIT_12_M'
  | 'SUIT_12_SB'
  | 'SUIT_12_B'
  | 'SUIT_14_M'
  | 'SUIT_16_M'
  | 'SUIT_16_SB'
  | 'SUIT_18_M'
  | 'SUIT_18_SB'
  | 'SUIT_18_B'
  | 'SUIT_20_M'
  | 'SUIT_20_SB'
  | 'SUIT_20_B'
  | 'SUIT_22_B'
  | 'SUIT_24_SB'
  | 'SUIT_24_B'
  | 'SUIT_32_SB'
  | 'SUIT_28_B';

export const textStyles: Record<Typography, SerializedStyles> = {
  SUIT_20_SM: css`
    font-size: 20px;
    font-weight: 400;
  `,
  SUIT_12_M: css`
    font-size: 12px;
    font-weight: 500;
  `,
  SUIT_12_SB: css`
    font-size: 12px;
    font-weight: 600;
  `,
  SUIT_12_B: css`
    font-size: 12px;
    font-weight: 700;
  `,
  SUIT_14_M: css`
    font-size: 14px;
    font-weight: 500;
  `,
  SUIT_16_M: css`
    font-size: 16px;
    font-weight: 500;
  `,
  SUIT_16_SB: css`
    font-size: 16px;
    font-weight: 600;
  `,
  SUIT_18_M: css`
    font-size: 18px;
    font-weight: 500;
  `,
  SUIT_18_SB: css`
    font-size: 18px;
    font-weight: 600;
  `,
  SUIT_18_B: css`
    font-size: 18px;
    font-weight: 700;
  `,
  SUIT_20_M: css`
    font-size: 20px;
    font-weight: 500;
  `,
  SUIT_20_SB: css`
    font-size: 20px;
    font-weight: 600;
  `,
  SUIT_20_B: css`
    font-size: 20px;
    font-weight: 700;
  `,
  SUIT_22_B: css`
    font-size: 22px;
    font-weight: 700;
  `,
  SUIT_24_SB: css`
    font-size: 24px;
    font-weight: 600;
  `,
  SUIT_24_B: css`
    font-size: 24px;
    font-weight: 700;
  `,
  SUIT_32_SB: css`
    font-size: 32px;
    font-weight: 600;
  `,
  SUIT_28_B: css`
    font-size: 28px;
    font-weight: 700;
  `,
};
