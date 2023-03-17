import { Category, ServiceType } from '@/components/projects/upload/types';

export type Profile = {
  id: number;
  name: string;
  profileImage: string;
  birthday: string;
  phone: string;
  email: string;
  address: string;
  university: string;
  major: string;
  introduction: string;
  skill: string;
  activities: {
    generation: number;
    id: number;
    part: string;
    team: string;
  }[];
  links: Link[];
  openToWork: boolean;
  openToSideProject: boolean;
  allowOfficial: boolean;
  careers: Career[];
};

export type PagedMemberProfile = {
  members: Profile[];
  hasNext: boolean;
};

export type ProfileDetail = {
  name: string;
  profileImage: string;
  birthday: string;
  phone: string;
  email: string;
  address: string;
  university: string;
  major: string;
  introduction: string;
  skill: string;
  mbti: string;
  mbtiDescription: string;
  sojuCapacity: number;
  interest: string;
  isPourSauceLover: boolean;
  isHardPeachLover: boolean;
  isMintChocoLover: boolean;
  isRedBeanFishBreadLover: boolean;
  isSojuLover: boolean;
  isRiceTteokLover: boolean;
  idealType: string;
  selfIntroduction: string;
  activities: {
    cardinalInfo: string;
    cardinalActivities: Activity[];
  }[];
  links: Link[];
  projects: MemberProject[];
  careers: Career[];
  allowOfficial: boolean;
  isMine: boolean;
};

export type Activity = {
  id: number;
  generation: number;
  team: string;
  part: string;
  isProject: boolean;
};

type Link = {
  id: number;
  title: string;
  url: string;
};

export type Member = {
  id: number;
  name: string;
  generation: number;
  hasProfile: true;
  profileImage?: string | null;
};

export type MemberProject = {
  category: Category;
  generation: number;
  id: number;
  serviceType: ServiceType[];
  logoImage: string;
  name: string;
  summary: string;
  thumbnailImage: string;
};

type Career = {
  id: number;
  companyName: string;
  title: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
};

export type ProfileRequest = {
  name: string;
  profileImage: string | null;
  birthday: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  university: string | null;
  major: string | null;
  introduction: string | null;
  skill: string | null;
  activities: {
    generation: string;
    part: string;
    team: string;
  }[];
  links: Omit<Link, 'id'>[] | null;
  openToWork: boolean;
  openToSideProject: boolean;
  allowOfficial: boolean;
  careers: Career[];
};

export interface PostMemberCoffeeChatVariables {
  receiverId: string;
  senderEmail: string;
  category: string;
  content: string;
}
