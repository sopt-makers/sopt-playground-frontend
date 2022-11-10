import { Category, ServiceType } from '@/components/projects/upload/types';

export type Project = {
  id: number;
  name: string;
  writerId: number;
  generation: number;
  category: Category;
  startAt: string;
  endAt?: string;
  serviceType: ServiceType[];
  isAvailable: boolean;
  isFounding: boolean;
  summary: string;
  detail: string;
  logoImage: string;
  thumbnailImage: string;
  images: string[];
  members: ProjectMember[];
  links: ProjectLink[];
};

type ProjectInputOmitType = 'id' | 'links' | 'generation';
export type ProjectInput = Omit<Project, ProjectInputOmitType> & {
  links: Omit<ProjectLink, 'linkId'>[];
  generation?: number;
};

export type ProjectMember = {
  memberId: number;
  memberRole: string;
  memberDescription: string;
  isTeamMember: boolean;
};

export type ProjectLink = {
  linkId: number;
  linkTitle: string;
  linkUrl: string;
};
