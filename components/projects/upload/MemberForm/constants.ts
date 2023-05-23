import { Member } from '@/api/endpoint_LEGACY/members/type';

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
