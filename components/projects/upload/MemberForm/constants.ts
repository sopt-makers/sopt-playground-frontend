import { Member } from '@/api/members/type';
import { MemberRole, ProjectMember } from '@/api/projects/type';

export type MemeberFormType = ProjectMember & {
  isEdit?: boolean;
  searchedMember?: Member;
};

export const DEFAULT_MEMBER: Partial<MemeberFormType> = {
  memberRole: undefined,
  memberDescription: '',
  isTeamMember: true,
  memberName: '',
  memberGeneration: undefined,
  isEdit: true,
};

export const MemberRoleInfo: {
  label: string;
  value: MemberRole;
}[] = [
  {
    label: 'Team Leader',
    value: 'TEAMLEADER',
  },
  {
    label: 'PM',
    value: 'PM',
  },
  {
    label: 'Design',
    value: 'DESIGN',
  },
  {
    label: 'iOS',
    value: 'IOS',
  },
  {
    label: 'Android',
    value: 'ANDROID',
  },
  {
    label: 'Web',
    value: 'WEB',
  },
  {
    label: 'Server',
    value: 'SERVER',
  },
];
