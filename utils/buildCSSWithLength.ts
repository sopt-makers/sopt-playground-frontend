export type CSSValueWithLength = number | string;

export function buildCSSWithLength(property: string, value?: CSSValueWithLength) {
  return value !== undefined && `${property}: ${typeof value === 'string' ? value : `${value}px`};`;
}
