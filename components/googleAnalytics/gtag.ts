export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const gtag = (window as any).gtag;

export const pageview = (url: string) => {
  gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
