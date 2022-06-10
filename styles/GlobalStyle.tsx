import font from '@/styles/font';
import { reset } from '@/styles/reset';
import { css, Global } from '@emotion/react';

const global = css`
  ${font}
  ${reset}
`;

const GlobalStyle = () => <Global styles={global} />;

export default GlobalStyle;
