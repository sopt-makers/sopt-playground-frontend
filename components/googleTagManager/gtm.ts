const dataLayer =
  typeof window !== 'undefined'
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer
    : () => {
        // do nothing
      };

export const pageview = (url: string) => {
  dataLayer.push({
    event: 'pageview',
    page: url,
  });
};
