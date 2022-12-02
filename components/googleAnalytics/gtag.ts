export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

const gtag =
  typeof window !== 'undefined'
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag
    : () => {
        // do nothing
      };

export const pageview = (url: string) => {
  gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
