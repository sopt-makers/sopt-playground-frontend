import { useQuery } from '@tanstack/react-query';
import { uniqBy as _uniqBy } from 'lodash-es';

import { getProjectById } from '@/api/endpoint_LEGACY/projects';

export const getProjectQueryKey = (id: string) => ['getProjectQuery', id];
interface GetProjectQueryVariables {
  id: string;
}

const useGetProjectQuery = (variables: GetProjectQueryVariables) => {
  const { id } = variables;
  return useQuery({
    queryKey: getProjectQueryKey(id),

    queryFn: async () => {
      const data = await getProjectById(id);

      return {
        ...data,
        // FIXME: 서버 이슈로 링크가 여러개 생성되고 있음. 서버 수정되면 지우기
        links: [..._uniqBy(data.links, 'linkId')],
      };
    },
    enabled: !!id,
  });
};

export default useGetProjectQuery;
