import { project } from '@/api/project';
import { useQuery } from 'react-query';

const useGetProjectListQuery = () => {
  return useQuery(
    ['getProjectListQuery'],
    async () => {
      const {
        data: { data },
      } = await project.getList();
      return data;
    },
    {
      onError: (error: { message: string }) => {
        alert(error.message);
      },
    },
  );
};

export default useGetProjectListQuery;
