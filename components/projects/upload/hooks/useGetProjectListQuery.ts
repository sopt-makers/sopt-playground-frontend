import { useQuery } from '@tanstack/react-query';

import { getProjects } from '@/api/endpoint_LEGACY/projects';

export const getProjectListQueryKey = () => ['getProjectListQuery'];

const useGetProjectListQuery = () => {
  return useQuery(
    getProjectListQueryKey(),
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

export default useGetProjectListQuery;
