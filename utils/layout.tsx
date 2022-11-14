import { NextPage } from 'next';
import { FC, ReactElement, ReactNode } from 'react';

export type LayoutLegacy = (page: ReactElement) => ReactNode;
export type Layout = FC<{ children: ReactNode }>;

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: LayoutLegacy;
};

export function getLayout<P, IP>(Component: NextPageWithLayout<P, IP>) {
  return Component.getLayout ?? ((page) => page);
}

/** @deprecated */
export function setLayoutLegacy(Component: NextPage, layout: LayoutLegacy) {
  (Component as NextPageWithLayout).getLayout = layout;
}

export function setLayout(Component: NextPage, Layout: Layout) {
  (Component as NextPageWithLayout).getLayout = (page) => <Layout>{page}</Layout>;
}
