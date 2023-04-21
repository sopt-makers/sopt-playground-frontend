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
    isTeamMember: boolean;
    memberDescription: string;
    memberGeneration: number;
    memberGenerations: number[];
    memberHasProfile?: boolean;
    memberId: number;
    memberName: string;
    memberProfileImage: string | null;
    memberRole: MemberRole;
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

type MemberRole = 'TEAMLEADER' | 'MAINPM' | 'PM' | 'DESIGN' | 'IOS' | 'ANDROID' | 'WEB' | 'SERVER';
type Category = 'APPJAM' | 'SOPKATHON' | 'SOPTERM' | 'STUDY' | 'JOINTSEMINAR' | 'ETC';

const LINK_TITLES = ['website', 'googlePlay', 'appStore', 'github', 'instagram', 'media'] as const;
export type LinkTitle = typeof LINK_TITLES[number];

export enum ServiceType {
  WEB = 'WEB',
  APP = 'APP',
}
