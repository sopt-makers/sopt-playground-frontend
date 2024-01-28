import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';

import { getProjects } from '@/api/endpoint_LEGACY/projects';
import { ProjectsRequestParams } from '@/api/endpoint_LEGACY/projects/type';

export const getProjectListQueryKey = (params: ProjectsRequestParams = {}) => ['getProjectListQuery', params];

const useGetProjectListQuery = (params: ProjectsRequestParams = {}) => {
  return useInfiniteQuery({
    queryKey: getProjectListQueryKey(params),
    queryFn: ({ pageParam = 0 }) =>
      getProjects({
        ...params,
        cursor: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) {
        return undefined;
      }
      return lastPage.projectList[lastPage.projectList.length - 1].id;
    },
  });
};

export default useGetProjectListQuery;
