export type LinkTitle = 'website' | 'googlePlay' | 'appStore' | 'github';
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
