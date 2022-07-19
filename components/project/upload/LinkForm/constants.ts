export type LinkTitle = 'website' | 'googlePlay' | 'appStore' | 'github';

export interface Link {
  title: LinkTitle;
  url: string;
}

export const LINK_TITLES: { title: LinkTitle; label: string }[] = [
  { title: 'website', label: '웹사이트' },
  { title: 'googlePlay', label: '구글 플레이스토어' },
  { title: 'appStore', label: '앱 스토어' },
  { title: 'github', label: 'Github' },
];

export const DEFAULT_LINK: Link = {
  title: 'website',
  url: '',
};
