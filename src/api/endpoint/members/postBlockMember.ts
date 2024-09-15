import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

interface RequestBody {
  blockedMemberId: number;
}

export const postBlockMember = createEndpoint({
  request: (requestBody: RequestBody) => ({
    method: 'PATCH',
    url: `api/v1/members/block/activate`,
    data: requestBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostBlockMemberMutation = () => {
  console.log('in hook');
  return useMutation({
    mutationFn: (requestBody: RequestBody) => postBlockMember.request(requestBody),
  });
};
