import { createContext } from 'react';

interface ResponsiveContextValue {
  mobileOnlyClassName: string;
  desktopOnlyClassName: string;
}

export const ResponsiveContext = createContext<ResponsiveContextValue>(
  new Proxy({} as ResponsiveContextValue, {
    get() {
      throw new Error('ResponsiveProvider가 필요합니다.');
    },
  }),
);
