import { PROJECT_CATEGORY } from '@/components/projects/upload/constants';

export type ProjectDetail = {
  id: number;
  name: string;
  writerId: number;
  generation: number;
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
    memberGeneration: number;
    memberHasProfile?: boolean;
  }[];
  links: {
    linkId: number;
    linkTitle: LinkTitle | string;
    linkUrl: string;
  }[];
};

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
  generation?: number;
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
