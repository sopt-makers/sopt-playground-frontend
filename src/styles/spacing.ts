import { css } from '@emotion/react';

import { buildCSSWithLength, CSSValueWithLength } from '@/utils';

export interface SpaceProps {
  m?: CSSValueWithLength;
  mt?: CSSValueWithLength;
  ml?: CSSValueWithLength;
  mr?: CSSValueWithLength;
  mb?: CSSValueWithLength;
  p?: CSSValueWithLength;
  pt?: CSSValueWithLength;
  pl?: CSSValueWithLength;
  pr?: CSSValueWithLength;
  pb?: CSSValueWithLength;
}

export function space({ m, mt, ml, mr, mb, p, pt, pl, pr, pb }: SpaceProps) {
  return css`
    ${buildCSSWithLength('margin', m)}
    ${buildCSSWithLength('margin-top', mt)}
    ${buildCSSWithLength('margin-left', ml)}
    ${buildCSSWithLength('margin-right', mr)}
    ${buildCSSWithLength('margin-bottom', mb)}
    ${buildCSSWithLength('padding', p)}
    ${buildCSSWithLength('padding-top', pt)}
    ${buildCSSWithLength('padding-left', pl)}
    ${buildCSSWithLength('padding-right', pr)}
    ${buildCSSWithLength('padding-bottom', pb)}
  `;
}
