import { css, keyframes } from '@emotion/react';
import { colors } from '@sopt-makers/colors';

const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const shimmerEffect = css`
  background: linear-gradient(110deg, ${colors.gray900} 0%, ${colors.gray800} 50%, ${colors.gray900} 100%);
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 2s ease-in-out infinite;
`;
