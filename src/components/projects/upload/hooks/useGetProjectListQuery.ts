import { useQuery } from '@tanstack/react-query';

import { getProjects } from '@/api/endpoint_LEGACY/projects';

export const getProjectListQueryKey = () => ['getProjectListQuery'];

const useGetProjectListQuery = () => {
  return useQuery({
    queryKey: getProjectListQueryKey(),
    queryFn: getProjects,
  });
};

export default useGetProjectListQuery;
