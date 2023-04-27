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

type MemberRole = 'TEAMLEADER' | 'MAINPM' | 'PM' | 'DESIGN' | 'IOS' | 'ANDROID' | 'WEB' | 'SERVER';

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
  DESIGN: 'Design',
  WEB: 'Web',
  ANDROID: 'Android',
  SERVER: 'Server',
  IOS: 'iOS',
};
