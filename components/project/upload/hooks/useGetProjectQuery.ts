import { project } from '@/api/project';
import { useQuery } from 'react-query';

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
        alert(error.message);
      },
    },
  );
};

export default useGetProjectQuery;
