import { useQuery } from '@tanstack/react-query';

import { getMembersSearchByName } from '@/api/endpoint/members';
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
      const data = await getMembersSearchByName.request(name);
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
