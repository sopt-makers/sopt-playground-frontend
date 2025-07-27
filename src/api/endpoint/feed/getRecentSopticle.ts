import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const ActivitySchema = z.object({
  part: z.string(),
  generation: z.number(),
  team: z.string().nullable(),
});

const CareerSchema = z.object({
  id: z.number(),
  memberId: z.number(),
  companyName: z.string(),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  isCurrent: z.boolean(),
});

const MemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  profileImage: z.string().nullable(),
  activity: ActivitySchema,
  careers: CareerSchema.nullable(),
});

const recentSopticleSchema = z.object({
  id: z.number(),
  member: MemberSchema,
  createdAt: z.string(),
  title: z.string(),
  content: z.string(),
  sopticleUrl: z.string(),
  images: z.array(z.string()),
});

export type RecentSopticleType = z.infer<typeof recentSopticleSchema>;

const getRecentSopticles = createEndpoint({
  request: {
    method: 'GET',
    url: '/api/v1/community/posts/sopticle',
  },
  serverResponseScheme: z.array(recentSopticleSchema),
});

export const useRecentSopticles = () =>
  useQuery({
    queryKey: ['recentSopticles'],
    queryFn: () => getRecentSopticles.request(),
  });
