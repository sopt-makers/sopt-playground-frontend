import { css, SerializedStyles } from '@emotion/react';

export const baseTextStyles = css`
  letter-spacing: -0.01em;
`;

export type Typography =
  | 'SUIT_12_M'
  | 'SUIT_12_SB'
  | 'SUIT_12_B'
  | 'SUIT_13_M'
  | 'SUIT_14_M'
  | 'SUIT_14_SB'
  | 'SUIT_14_B'
  | 'SUIT_16_M'
  | 'SUIT_15_SB'
  | 'SUIT_16_SB'
  | 'SUIT_16_B'
  | 'SUIT_18_M'
  | 'SUIT_18_SB'
  | 'SUIT_18_B'
  | 'SUIT_20_R'
  | 'SUIT_20_M'
  | 'SUIT_20_SB'
  | 'SUIT_20_B'
  | 'SUIT_22_R'
  | 'SUIT_22_M'
  | 'SUIT_22_SB'
  | 'SUIT_22_B'
  | 'SUIT_24_SB'
  | 'SUIT_24_B'
  | 'SUIT_24_M'
  | 'SUIT_28_R'
  | 'SUIT_28_M'
  | 'SUIT_28_SB'
  | 'SUIT_28_B'
  | 'SUIT_32_SB';

export const textStyles: Record<Typography, SerializedStyles> = {
  SUIT_20_R: css`
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
  SUIT_13_M: css`
    font-size: 13px;
    font-weight: 500;
  `,
  SUIT_14_M: css`
    font-size: 14px;
    font-weight: 500;
  `,
  SUIT_14_SB: css`
    font-size: 14px;
    font-weight: 600;
  `,
  SUIT_14_B: css`
    font-size: 14px;
    font-weight: 700;
  `,
  SUIT_16_M: css`
    font-size: 16px;
    font-weight: 500;
  `,
  SUIT_15_SB: css`
    font-size: 15px;
    font-weight: 600;
  `,
  SUIT_16_SB: css`
    font-size: 16px;
    font-weight: 600;
  `,
  SUIT_16_B: css`
    font-size: 16px;
    font-weight: 700;
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
  SUIT_22_R: css`
    font-size: 22px;
    font-weight: 400;
  `,
  SUIT_22_M: css`
    font-size: 22px;
    font-weight: 500;
  `,
  SUIT_22_SB: css`
    font-size: 22px;
    font-weight: 600;
  `,
  SUIT_22_B: css`
    font-size: 22px;
    font-weight: 700;
  `,
  SUIT_24_M: css`
    font-size: 24px;
    font-weight: 500;
  `,
  SUIT_24_SB: css`
    font-size: 24px;
    font-weight: 600;
  `,
  SUIT_24_B: css`
    font-size: 24px;
    font-weight: 700;
  `,
  SUIT_28_R: css`
    font-size: 28px;
    font-weight: 400;
  `,
  SUIT_28_M: css`
    font-size: 28px;
    font-weight: 500;
  `,
  SUIT_28_SB: css`
    font-size: 28px;
    font-weight: 600;
  `,
  SUIT_28_B: css`
    font-size: 28px;
    font-weight: 700;
  `,
  SUIT_32_SB: css`
    font-size: 32px;
    font-weight: 600;
  `,
};
