import { useQuery } from '@tanstack/react-query';
import { uniqBy as _uniqBy } from 'lodash-es';

import { getProjectById } from '@/api/endpoint_LEGACY/projects';

interface GetProjectQueryVariables {
  id: string;
}

const useGetProjectQuery = (variables: GetProjectQueryVariables) => {
  const { id } = variables;
  return useQuery(
    ['getProjectQuery', id],
    async () => {
      const data = await getProjectById(id);

      return {
        ...data,
        // FIXME: 서버 이슈로 링크가 여러개 생성되고 있음. 서버 수정되면 지우기
        links: [..._uniqBy(data.links, 'linkId')],
      };
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
