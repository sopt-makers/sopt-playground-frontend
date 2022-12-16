const dataLayer =
  typeof window === 'undefined'
    ? undefined
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer;

export const pageview = (url: string) => {
  if (!dataLayer) throw new Error('pageview push 실패');
  dataLayer.push({
    event: 'pageview',
    page: url,
  });
};
