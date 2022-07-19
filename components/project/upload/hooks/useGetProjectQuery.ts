import { project } from '@/api/project';
import { useQuery } from 'react-query';

interface GetProjectQueryVariables {
  id: string;
}

const useGetProjectQuery = (varaiables: GetProjectQueryVariables) => {
  const { id } = varaiables;
  return useQuery(
    ['getProjectQuery', varaiables],
    async () => {
      const {
        data: { data },
      } = await project.get(id);

      return data;
    },
    {
      onError: (error: { message: string }) => {
        alert(error.message);
      },
    },
  );
};

export default useGetProjectQuery;
