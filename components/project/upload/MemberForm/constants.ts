import { Role } from '@/api/project/types';

export interface Member {
  userId?: number;
  role?: Role;
  isTeamMember?: boolean;
  description?: string;
}

export const DEFAULT_MEMBER: Member = {
  userId: undefined,
  role: undefined,
  isTeamMember: undefined,
  description: undefined,
};
