import { ProjectLink } from '@/api/projects/type';

export type LinkFormType = Omit<ProjectLink, 'linkId'> & {
  isEdit?: boolean;
};

export const DEFAULT_LINK: LinkFormType = {
  linkTitle: 'website',
  linkUrl: '',
  isEdit: true,
};
