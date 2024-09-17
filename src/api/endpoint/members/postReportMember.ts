import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

interface RequestBody {
  reportMemberId: number;
}

export const postReportMember = createEndpoint({
  request: (requestBody: RequestBody) => ({
    method: 'POST',
    url: `api/v1/members/report`,
    data: requestBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostReportMemberMutation = () => {
  return useMutation({
    mutationFn: (requestBody: RequestBody) => postReportMember.request(requestBody),
  });
};
