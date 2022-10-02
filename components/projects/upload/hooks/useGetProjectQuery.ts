import { useQuery } from 'react-query';

import { project } from '@/api/project';

interface GetProjectQueryVariables {
  id: string;
}

const useGetProjectQuery = (varaiables: GetProjectQueryVariables) => {
  const { id } = varaiables;
  return useQuery(
    ['getProjectQuery', id],
    async () => {
      const { data } = await project.get(id);

      return data;
    },
    {
      enabled: !!id,
      onError: (error: { message: string }) => {
        console.error(error.message);
      },
    },
  );
};

export default useGetProjectQuery;
