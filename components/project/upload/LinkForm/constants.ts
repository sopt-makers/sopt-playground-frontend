export const LINK_TITLES = ['website', 'googlePlay', 'appStore', 'github'] as const;

export type LinkTitle = typeof LINK_TITLES[number];
export interface Link {
  title: LinkTitle;
  url: string;
  isEdit?: boolean;
}

export const DEFAULT_LINK: Link = {
  title: 'website',
  url: '',
  isEdit: true,
};
