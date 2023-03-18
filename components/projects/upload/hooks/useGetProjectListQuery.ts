import { useQuery } from '@tanstack/react-query';

import { getProjects } from '@/api/projects';

const useGetProjectListQuery = () => {
  return useQuery(
    ['getProjectListQuery'],
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
