export enum LinkTitle {
  'website' = '웹사이트',
  'googlePlay' = '구글 플레이스토어',
  'appStore' = '앱 스토어',
  'github' = 'Github',
}
export interface Link {
  title: LinkTitle;
  url: string;
  isEdit?: boolean;
}

export const DEFAULT_LINK: Link = {
  title: LinkTitle.website,
  url: '',
  isEdit: true,
};
