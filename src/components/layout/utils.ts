interface CreateLayoutCSSVariableOptions {
  headerHeight: number;
  footerHeight?: number;
}

const layoutCSSVariableNames = {
  globalHeaderHeight: '--global-header-height',
  globalFooterHeight: '--global-footer-height',
  contentAreaHeight: '--content-area-height',
};

export const layoutCSSVariable = Object.fromEntries(
  Object.entries(layoutCSSVariableNames).map(([key, value]) => [key, `var(${value})`]),
) as Record<keyof typeof layoutCSSVariableNames, string>;

export function createLayoutCSSVariable({ headerHeight, footerHeight = 0 }: CreateLayoutCSSVariableOptions) {
  return `
    ${layoutCSSVariableNames.globalHeaderHeight}: ${headerHeight}px;
    ${layoutCSSVariableNames.globalFooterHeight}: ${footerHeight}px;
    ${layoutCSSVariableNames.contentAreaHeight}: calc(100vh - var(--global-header-height) - var(--global-footer-height));
  `;
}
