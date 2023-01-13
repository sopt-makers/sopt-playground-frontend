import { Member } from '@/api/members/type';
import { MemberRole, ProjectMember } from '@/api/projects/type';

export type MemberFormType = ProjectMember & {
  isEdit?: boolean;
  searchedMember?: Member;
};

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
  IOS: 'iOS',
  ANDROID: 'Android',
  WEB: 'Web',
  SERVER: 'Server',
};
