export type ProjectDetail = {
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

export type MemberRole = 'TEAMLEADER' | 'MAINPM' | 'PM' | 'DESIGN' | 'IOS' | 'ANDROID' | 'WEB' | 'SERVER';

export const LINK_TITLES = ['website', 'googlePlay', 'appStore', 'github', 'instagram', 'media'] as const;
export type LinkTitle = typeof LINK_TITLES[number];

export type ProjectLink = {
  linkId: number;
  linkTitle: LinkTitle | string;
  linkUrl: string;
};

export enum ServiceType {
  WEB = 'WEB',
  APP = 'APP',
}

export enum Category {
  APPJAM = 'APPJAM',
  SOPKATHON = 'SOPKATHON',
  SOPTERM = 'SOPTERM',
  STUDY = 'STUDY',
  JOINTSEMINAR = 'JOINTSEMINAR',
  ETC = 'ETC',
}
