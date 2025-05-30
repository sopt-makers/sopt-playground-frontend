import { PROJECT_CATEGORY } from '@/components/projects/constants';

export interface ProjectsRequestParams {
  limit?: number;
  cursor?: number;
  name?: string | null;
  isAvailable?: boolean | null;
  isFounding?: boolean | null;
  category?: string | null;
}

export type ProjectDetail = {
  id: number;
  name: string;
  writerId: number;
  generation: number | null;
  category: ProjectCategory;
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
  members: {
    memberId: number;
    memberRole: MemberRole;
    memberDescription: string;
    isTeamMember: boolean;
    memberName: string;
    memberGenerations: number[];
    memberProfileImage: string;
    memberHasProfile?: boolean;
  }[];
  links: {
    linkId: number;
    linkTitle: LinkTitle | string;
    linkUrl: string;
  }[];
};

interface ProjectMember {
  memberId: number;
  memberName: string;
  memberProfileImage?: string | null;
}

interface ProjectLink {
  linkId: number;
  linkTitle: string;
  linkUrl: string;
}

export interface ProjectListResponse {
  id: number;
  writerId: number;
  generation: number | null;
  category: ProjectCategory;
  startAt: string;
  isAvailable: boolean;
  isFounding: boolean;
  detail: string;
  members: ProjectMember[];
  name: string;
  logoImage: string;
  links: ProjectLink[];
  serviceType: ServiceType[];
  summary: string;
  thumbnailImage: string;
}

export type ProjectInput = {
  name: string;
  writerId: number;
  category: ProjectCategory;
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
  links: {
    linkTitle: LinkTitle | string;
    linkUrl: string;
  }[];
  generation: number | null;
  members: {
    memberId: number;
    memberRole: MemberRole;
    memberDescription: string;
    isTeamMember: boolean;
    memberHasProfile?: boolean;
  }[];
};

export type MemberRole =
  | 'TEAMLEADER'
  | 'MAINPM'
  | 'PM'
  | 'TEAMIMPROVEMENT'
  | 'DESIGN'
  | 'IOS'
  | 'ANDROID'
  | 'WEB'
  | 'SERVER';

export type ProjectCategory = (typeof PROJECT_CATEGORY)[number];
export function isProjectCategory(category: string): category is ProjectCategory {
  return PROJECT_CATEGORY.includes(category as ProjectCategory);
}

const LINK_TITLES = ['website', 'googlePlay', 'appStore', 'github', 'instagram', 'media'] as const;
export type LinkTitle = (typeof LINK_TITLES)[number];

export enum ServiceType {
  WEB = 'WEB',
  APP = 'APP',
}
