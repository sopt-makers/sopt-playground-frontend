import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

/**
 * @desc 자신의 토큰으로 조회
 */
export const getMemberOfMe = createEndpoint({
  request: {
    method: 'GET',
    url: 'api/v1/members/me',
  },
  serverResponseScheme: z.object({
    id: z.number(),
    name: z.string(),
    generation: z.number(),
    hasProfile: z.boolean(),
    profileImage: z.string().nullable(),
  }),
});

/**
 * @desc 멤버 프로필 조회
 */
export const useGetMemberOfMe = () => {
  return useQuery(
    ['getMemberOfMe'],
    async () => {
      const data = await getMemberOfMe.request();
      return data;
    },
    {
      onError: (error: { message: string }) => {
        console.error(error.message);
      },
    },
  );
};
