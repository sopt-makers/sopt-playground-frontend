import { useRouter } from 'next/router';
import qs from 'qs';
import { QueryKey, useInfiniteQuery } from 'react-query';

import { getMemberProfile } from '@/api/members';
import type { PagedMemberProfile } from '@/api/members/type';

interface UseMemberProfileQueryVariables {
  limit?: number;
  queryKey?: QueryKey;
}

export const useMemberProfileQuery = ({ limit, queryKey }: UseMemberProfileQueryVariables) => {
  const _queryKey = (typeof queryKey === 'string' ? [queryKey] : queryKey) ?? [];
  const { query } = useRouter();
  return useInfiniteQuery({
    queryKey: ['getMemberProfile', limit, ..._queryKey],
    queryFn: async ({ pageParam: cursor = 0 }) => {
      const searchParams = { limit, cursor, ...query };
      const data = await getMemberProfile(qs.stringify(searchParams, { addQueryPrefix: true }));
      return data;
    },
    getNextPageParam: (lastPage: PagedMemberProfile) => {
      if (lastPage.hasNext) {
        const lastIndex = lastPage.members.length - 1;
        const lastMemberId = lastPage.members[lastIndex].id;
        return lastMemberId;
      } else {
        return null;
      }
    },
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
    keepPreviousData: true,
  });
};
