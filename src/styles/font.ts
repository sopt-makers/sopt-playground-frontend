import { css } from '@emotion/react';

const font = css`
  @font-face {
    font-family: SUIT;
    src: url('/fonts/SUIT-ExtraBold.woff2') format('woff2');
    font-weight: 800;
    font-display: swap;
  }
  @font-face {
    font-family: SUIT;
    src: url('/fonts/SUIT-Bold.woff2') format('woff2');
    font-weight: 700;
    font-display: swap;
  }
  @font-face {
    font-family: SUIT;
    src: url('/fonts/SUIT-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-display: swap;
  }
  @font-face {
    font-family: SUIT;
    src: url('/fonts/SUIT-Medium.woff2') format('woff2');
    font-weight: 500;
    font-display: swap;
  }
`;

export default font;
