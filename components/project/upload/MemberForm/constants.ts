import { Role } from '@/api/project/types';

export interface Member {
  userId?: number;
  role?: Role;
  isTeamMember?: boolean;
  description?: string;
  isEdit?: boolean;
}

export const DEFAULT_MEMBER: Member = {
  userId: undefined,
  role: undefined,
  isTeamMember: true,
  description: undefined,
  isEdit: true,
};
