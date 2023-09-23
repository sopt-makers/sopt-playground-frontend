import { Member } from '@/api/endpoint_LEGACY/members/type';
import { Category, LinkTitle } from '@/components/projects/types';

export type MemberFormType = {
  memberId: number;
  memberRole: MemberRole;
  memberDescription: string;
  isTeamMember: boolean;
  memberName: string;
  memberGeneration: number;
  memberHasProfile?: boolean;
  isEdit?: boolean;
  searchedMember?: Member;
};

type MemberRole = 'TEAMLEADER' | 'MAINPM' | 'PM' | 'TEAMIMPROVEMENT' | 'DESIGN' | 'IOS' | 'ANDROID' | 'WEB' | 'SERVER';

export const DEFAULT_MEMBER: Partial<MemberFormType> = {
  memberRole: undefined,
  memberDescription: '',
  isTeamMember: true,
  memberName: '',
  memberGeneration: undefined,
  isEdit: true,
};

export const MemberRoleInfo: Record<MemberRole, string> = {
  TEAMLEADER: 'Team Leader',
  MAINPM: 'Main PM',
  PM: 'PM',
  TEAMIMPROVEMENT: 'Team Improvement',
  DESIGN: 'Designer',
  WEB: '웹 프론트엔드 개발자',
  ANDROID: 'Android 개발자',
  SERVER: '서버 개발자',
  IOS: 'iOS 개발자',
};

export const categoryLabel: Record<Category, string> = {
  APPJAM: '앱잼',
  SOPKATHON: '솝커톤',
  SOPTERM: '솝텀 프로젝트',
  STUDY: '스터디',
  JOINTSEMINAR: '합동 세미나',
  ETC: '사이드 프로젝트',
};

export const getLinkInfo = (linkTitle: LinkTitle | string) => {
  switch (linkTitle as LinkTitle) {
    case 'website':
      return { icon: '/icons/icon-web.svg', label: '서비스 바로가기' };
    case 'googlePlay':
      return { icon: '/icons/icon-googleplay.svg', label: 'Google Play' };
    case 'appStore':
      return { icon: '/icons/icon-appstore.svg', label: 'App Store' };
    case 'github':
      return { icon: '/icons/icon-github.svg', label: 'Github' };
    case 'instagram':
      return { icon: '/icons/icon-instagram.svg', label: 'Instagram' };
    case 'media':
      return { icon: '/icons/icon-media.svg', label: 'Media' };
    default:
      return { icon: '/icons/icon-etc.svg', label: '기타' };
  }
};

export const PROJECT_CATEGORY = ['APPJAM', 'SOPKATHON', 'SOPTERM', 'STUDY', 'JOINTSEMINAR', 'ETC'] as const;
