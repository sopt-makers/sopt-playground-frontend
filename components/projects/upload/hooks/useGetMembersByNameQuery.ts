import { useQuery } from 'react-query';

import { getMembersSearchByName } from '@/api/members';
interface GetMembersByNameQueryVariables {
  name: string;
}
const useGetMembersByNameQuery = (variables: GetMembersByNameQueryVariables) => {
  const { name } = variables;
  return useQuery(
    ['useGetMembersSearchByName', variables],
    async () => {
      if (!name) {
        return;
      }
      const data = await getMembersSearchByName(name);
      return data;
    },
    {
      onError: (error: { message: string }) => {
        console.error(error.message);
      },
      keepPreviousData: true,
    },
  );
};

export default useGetMembersByNameQuery;
