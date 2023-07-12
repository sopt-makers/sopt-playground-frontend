export const categoryLabel = {
  APPJAM: '앱잼',
  SOPKATHON: '솝커톤',
  SOPTERM: '솝텀 프로젝트',
  STUDY: '스터디',
  JOINTSEMINAR: '합동 세미나',
  ETC: '사이드 프로젝트',
} as const;

export type CategoryType = keyof typeof categoryLabel;

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
