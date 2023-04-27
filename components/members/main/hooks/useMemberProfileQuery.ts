import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import qs from 'qs';

import { getMemberProfile } from '@/api/endpoint_LEGACY/members';
import type { PagedMemberProfile } from '@/api/endpoint_LEGACY/members/type';

interface UseMemberProfileQueryVariables {
  limit?: number;
  queryKey?: QueryKey;
}

export const useMemberProfileQuery = ({ limit, queryKey }: UseMemberProfileQueryVariables) => {
  const { query, isReady } = useRouter();
  const _queryKey = (typeof queryKey === 'string' ? [queryKey] : queryKey) ?? [];

  return useInfiniteQuery({
    queryKey: ['getMemberProfile', limit, ..._queryKey],
    queryFn: async ({ pageParam: cursor = 0 }) => {
      const searchParams = { limit, cursor, ...query };
      const data = await getMemberProfile(qs.stringify(searchParams, { addQueryPrefix: true }));
      return data;
    },
    getNextPageParam: (lastPage: PagedMemberProfile) => {
      if (!lastPage.hasNext) {
        return undefined;
      }
      const lastIndex = lastPage.members.length - 1;
      const lastMemberId = lastPage.members[lastIndex].id;
      return lastMemberId;
    },
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
    enabled: isReady,
    keepPreviousData: true,
  });
};
