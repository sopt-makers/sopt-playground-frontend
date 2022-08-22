import { Role } from '@/api/project/types';
import { User } from '@/api/user/types';

export interface Member {
  user?: User;
  role?: Role;
  isTeamMember?: boolean;
  description?: string;
  isEdit?: boolean;
}

export const DEFAULT_MEMBER: Member = {
  user: undefined,
  role: undefined,
  isTeamMember: true,
  description: undefined,
  isEdit: true,
};
