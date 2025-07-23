/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  naver: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    'dotlottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      autoplay?: boolean;
      loop?: boolean;
      hover?: boolean;
    };
  }
}
