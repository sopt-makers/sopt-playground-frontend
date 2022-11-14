import { NextPage } from 'next';
import { FC, ReactNode } from 'react';

export type Layout = FC<{ children: ReactNode }>;

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: Layout;
};

export function getLayout<P, IP>(Component: NextPageWithLayout<P, IP>) {
  return Component.getLayout ?? (({ children }) => children);
}

export function setLayout(Component: NextPage, Layout: Layout) {
  (Component as NextPageWithLayout).getLayout = Layout;
}
