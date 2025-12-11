import { ProjectCategory } from '@/api/endpoint_LEGACY/projects/type';
import { ServiceType } from '@/components/projects/types';

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
  links: MemberLink[];
  allowOfficial: boolean;
  careers: Career[];
  isCoffeeChatActivate: boolean;
};

export type PagedMemberProfile = {
  members: Profile[];
  hasNext: boolean;
  totalMembersCount: number;
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
  workPreference: {
    ideationStyle: string;
    workTime: string;
    communicationStyle: string;
    workPlace: string;
    feedbackStyle: string;
  };
  userFavor: {
    isPourSauceLover: boolean;
    isHardPeachLover: boolean;
    isMintChocoLover: boolean;
    isRedBeanFishBreadLover: boolean;
    isSojuLover: boolean;
    isRiceTteokLover: boolean;
  };
  selfIntroduction: string;
  soptActivities: SoptActivity[];
  links: MemberLink[];
  projects: MemberProject[];
  careers: Career[];
  allowOfficial: boolean;
  isMine: boolean;
  isPhoneBlind: boolean;
  isCoffeeChatActivate: boolean;
};

export type SoptActivity = {
  generation: number;
  part: string;
  team: string | null;
  projects: {
    id: number;
    generation: number;
    name: string;
    category: ProjectCategory;
  }[];
};

export type MemberLink = {
  id: number;
  title: string;
  url: string;
};

export type Member = {
  id: number;
  name: string;
  generation: number;
  hasProfile: true;
  profileImage: string | null;
};

export type MemberProject = {
  category: ProjectCategory;
  generation: number;
  id: number;
  serviceType: ServiceType[];
  logoImage: string;
  name: string;
  summary: string;
  thumbnailImage: string;
};

type Career =
  | {
      id: number;
      companyName: string;
      title: string;
      startDate: string;
      endDate: null;
      isCurrent: true;
    }
  | {
      id: number;
      companyName: string;
      title: string;
      startDate: string;
      endDate: string;
      isCurrent: false;
    };

export interface ProfileRequest {
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
    team: string | null;
  }[];
  links: Omit<MemberLink, 'id'>[] | null;
  allowOfficial: boolean;
  careers: Omit<Career, 'id'>[];
  mbti: string | null;
  mbtiDescription: string | null;
  sojuCapacity: number | null;
  interest: string | null;
  workPreference: {
    ideationStyle: string | null;
    workTime: string | null;
    communicationStyle: string | null;
    workPlace: string | null;
    feedbackStyle: string | null;
  };
  userFavor: {
    isPourSauceLover: boolean | null;
    isHardPeachLover: boolean | null;
    isMintChocoLover: boolean | null;
    isRedBeanFishBreadLover: boolean | null;
    isSojuLover: boolean | null;
    isRiceTteokLover: boolean | null;
  };
  selfIntroduction: string | null;
  isPhoneBlind: boolean | null;
}

export interface PostMemberMessageVariables {
  receiverId: string;
  senderEmail?: string;
  senderPhone?: string;
  category: string;
  content: string;
}
