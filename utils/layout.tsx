import { NextPage } from 'next';
import { FC, ReactNode } from 'react';

import { preDefinedLayouts } from '@/components/layout';

export type Layout = FC<{ children: ReactNode }>;

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: Layout;
};

export function getLayout<P, IP>(Component: NextPageWithLayout<P, IP>) {
  return Component.getLayout ?? (({ children }) => children);
}

export function setLayout(Component: NextPage, layoutOrPreDefinedKey: Layout | keyof typeof preDefinedLayouts) {
  if (typeof layoutOrPreDefinedKey === 'string') {
    const layout = preDefinedLayouts[layoutOrPreDefinedKey];
    (Component as NextPageWithLayout).getLayout = layout;
    return;
  }
  (Component as NextPageWithLayout).getLayout = layoutOrPreDefinedKey;
}
