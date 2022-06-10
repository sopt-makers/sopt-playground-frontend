import { css } from '@emotion/react';
import SUIT_EXTRA_BOLD from '@/public/fonts/SUIT-ExtraBold.ttf';
import SUIT_BOLD from '@/public/fonts/SUIT-Bold.ttf';
import SUIT_SEMI_BOLD from '@/public/fonts/SUIT-SemiBold.ttf';
import SUIT_Medium from '@/public/fonts/SUIT-Medium.ttf';

const font = css`
  @font-face {
    font-family: SUIT;
    src: url(${SUIT_EXTRA_BOLD}) format('truetype');
    font-weight: 800;
  }
  @font-face {
    font-family: SUIT;
    src: url(${SUIT_BOLD}) format('truetype');
    font-weight: 700;
  }
  @font-face {
    font-family: SUIT;
    src: url(${SUIT_SEMI_BOLD}) format('truetype');
    font-weight: 600;
  }
  @font-face {
    font-family: SUIT;
    src: url(${SUIT_Medium}) format('truetype');
    font-weight: 500;
  }
`;

export default font;
