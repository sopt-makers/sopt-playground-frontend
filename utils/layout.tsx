import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type Layout = (page: ReactElement) => ReactNode;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: Layout;
};

export function getLayout<P, IP>(Component: NextPageWithLayout<P, IP>) {
  return Component.getLayout ?? ((page) => page);
}

export function setLayout(Component: NextPage, layout: Layout) {
  (Component as NextPageWithLayout).getLayout = layout;
}
