export const DEFAULT_MEMBER = {
  memberId: '',
  memberRole: '',
  memberDescription: '',
};

export const linkTitles = ['website', 'googlePlay', 'appStore', 'github', 'instagram', 'media'] as const;
export type LinkTitleType = typeof linkTitles[number];

export type LinkType = {
  linkTitle: string;
  linkUrl: string;
};

export const DEFAULT_LINK: LinkType = {
  linkTitle: linkTitles[0],
  linkUrl: '',
};
