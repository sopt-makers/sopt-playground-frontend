import { ReactElement, ReactNode } from 'react';

export type LinkRenderer = (data: { href: string; children: ReactNode }) => ReactElement;
export type PathMatcher = (path: string) => boolean;
