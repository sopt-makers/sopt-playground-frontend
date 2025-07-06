import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getMembersSearchByName } from '@/api/endpoint/members/getMembersSearchByName';

interface GetMembersByNameQueryVariables {
  name: string;
}
const useGetMembersByNameQuery = (variables: GetMembersByNameQueryVariables) => {
  const { name } = variables;
  return useQuery({
    queryKey: ['useGetMembersSearchByName', variables],
    queryFn: async () => {
      const data = await getMembersSearchByName.request(name);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export default useGetMembersByNameQuery;
