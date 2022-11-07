import { useQuery } from 'react-query';

import { getMemebersSearchByName } from '@/api/members';
interface GetMembersByNameQueryVariables {
  name: string;
}
const useGetMembersByNameQuery = (variables: GetMembersByNameQueryVariables) => {
  const { name } = variables;
  return useQuery(
    ['useGetMemebersSearchByName', variables],
    () => {
      if (!name) {
        return;
      }
      return getMemebersSearchByName(name);
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
