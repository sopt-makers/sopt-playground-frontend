export type LinkFormType = {
  linkTitle: string;
  linkUrl: string;
  isEdit?: boolean;
};

export const DEFAULT_LINK: LinkFormType = {
  linkTitle: 'website',
  linkUrl: '',
  isEdit: true,
};
