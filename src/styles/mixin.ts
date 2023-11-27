import { css } from '@emotion/react';

export const scrollOverMargin = (left?: number, right?: number) => css`
  margin-right: -${right || 16}px;
  margin-left: -${left || 16}px;
  padding-right: ${right || 16}px;
  padding-left: ${left || 16}px;
`;

export const horizontalScroll = css`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;
