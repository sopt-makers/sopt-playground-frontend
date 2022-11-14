import { Member } from '@/api/members/type';
import { ProjectMember } from '@/api/projects/type';

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
