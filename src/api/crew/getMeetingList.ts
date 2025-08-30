import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { axiosCrewInstance } from '@/api';
import { getComment } from '@/api/endpoint/feed/getComment';
import { createEndpoint } from '@/api/typedAxios';

export const MeetingAllResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  contents: z.string(),
  imageUrl: z.string(),
  category: z.string(),
});

export const MeetingListResponseSchema = z.array(MeetingAllResponseSchema);

export const getMeetingList = createEndpoint({
  request: () => ({
    method: 'GET',
    url: 'user/v2/meeting/all',
  }),
  serverResponseScheme: MeetingListResponseSchema,
  externalInstance: axiosCrewInstance,
});

export const useMeetingList = () => {
  return useQuery({
    queryKey: getMeetingList.cacheKey(),
    queryFn: () => getMeetingList.request(),
  });
};
