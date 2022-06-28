export type LinkType = 'github' | 'website' | 'googlePlay' | 'appStore';

export interface Link {
  key: number;
  type: LinkType | null;
  url: string;
}

export const LINK_TYPES = [
  { type: 'github', label: 'Github' },
  { type: 'website', label: '웹사이트' },
  { type: 'googlePlay', label: '구글 플레이스토어' },
  { type: 'appStore', label: '앱 스토어' },
];

export const DEFAULT_LINK_KEY = 0;
export const DEFAULT_LINK: Link = {
  key: DEFAULT_LINK_KEY,
  type: null,
  url: '',
};
