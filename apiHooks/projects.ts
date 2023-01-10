import { useQuery } from 'react-query';

import { getMemberProfileById } from '@/api/members';
import { getProjectById, getProjects } from '@/api/projects';

// project id로 조회
export const useGetProjectById = (id?: string) => {
  return useQuery(
    ['getProjectById', id],
    async () => {
      if (!id) return null;
      const data = await getProjectById(id);
      const membersWithProfileImage = await Promise.all(
        data.members.map(async (m) => {
          const profile = await getMemberProfileById(m.memberId);
          return { ...m, profileImage: profile.profileImage };
        }),
      );
      return { ...data, members: membersWithProfileImage };
    },
    {
      onError: (error: { message: string }) => {
        console.error(error.message);
      },
    },
  );
};

// project 전체 조회
export const useGetProjects = () => {
  return useQuery(
    ['getProjects'],
    async () => {
      const data = await getProjects();
      return data;
    },
    {
      onError: (error: { message: string }) => {
        console.error(error.message);
      },
    },
  );
};
