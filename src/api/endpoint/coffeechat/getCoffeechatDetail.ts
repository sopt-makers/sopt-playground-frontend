import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const CoffeechatDetailSchema = z.object({
  bio: z.string(),
  memberId: z.number(),
  name: z.string(),
  career: z.string(),
  organization: z.string().nullable(),
  memberCareerTitle: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string(),
  introduction: z.string().nullable(), // TODO: 커피챗 오픈 후, nullable 삭제 필요
  topicTypeList: z.array(z.string()),
  topic: z.string().nullable(), // TODO: 커피챗 오픈 후, nullable 삭제 필요
  meetingType: z.string(),
  guideline: z.string().nullable(),
  isMine: z.boolean().nullable(),
  isBlind: z.boolean().nullable(),
  profileImage: z.string().nullable(),
  isCoffeeChatActivate: z.boolean().nullable(),
  sections: z.array(z.string()),
});

export const getCoffeechatDetail = createEndpoint({
  request: (memberId: string) => ({
    method: 'GET',
    url: `api/v1/members/coffeechat/${memberId}`,
  }),
  serverResponseScheme: CoffeechatDetailSchema,
});

export const useGetCoffeechatDetail = (memberId: string | undefined) => {
  const id = memberId ?? '';

  return useQuery({
    queryKey: getCoffeechatDetail.cacheKey(id),
    queryFn: () => getCoffeechatDetail.request(id),
    enabled: !!memberId,
  });
};
