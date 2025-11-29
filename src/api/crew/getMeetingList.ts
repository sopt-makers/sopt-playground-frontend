import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { axiosCrewInstance } from '@/api';
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

export const MemberMeetingResponseSchema = z.object({
  meetingId: z.number(),
  meetingTitle: z.string(),
  imgUrl: z.string(),
  mStartTime: z.string().nullable(),
  mEndTime: z.string().nullable(),
  meetingCategory: z.string(),
  isLeader: z.boolean(),
});

export const MemberMeetingListResponseSchema = z.object({
  userAppliedMeetings: z.array(MemberMeetingResponseSchema),
});

export const getMemberMeetingList = createEndpoint({
  request: (id: string) => ({
    method: 'GET',
    url: `internal/meetings/${id}`,
  }),
  serverResponseScheme: MemberMeetingListResponseSchema,
  externalInstance: axiosCrewInstance,
});

export const useMemberMeetingList = (id: string) => {
  return useQuery({
    queryKey: getMemberMeetingList.cacheKey(id),
    queryFn: () => getMemberMeetingList.request(id),
  });
};
