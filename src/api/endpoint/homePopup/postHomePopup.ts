import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { ADMIN_KEY } from '@/constants/env';

const HomePopupSchema = z.object({
  id: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  pcImageUrl: z.string(),
  mobileImageUrl: z.string(),
  linkUrl: z.string().nullable(),
  openInNewTab: z.boolean(),
  showOnlyToRecentGeneration: z.boolean(),
});

export const PostHomePopupRequestSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  pcImageUrl: z.string(),
  mobileImageUrl: z.string(),
  linkUrl: z.string().nullable().optional(),
  openInNewTab: z.boolean(),
  showOnlyToRecentGeneration: z.boolean(),
});

export const PostHomePopupResponseSchema = HomePopupSchema;

export type PostHomePopupRequest = z.infer<typeof PostHomePopupRequestSchema>;

export const postHomePopup = createEndpoint({
  request: (data: PostHomePopupRequest) => ({
    method: 'POST',
    url: 'api/v1/popups',
    headers: {
      'admin-key': ADMIN_KEY,
    },
    data,
  }),
  serverResponseScheme: PostHomePopupResponseSchema,
});

export const usePostHomePopup = () =>
  useMutation({
    mutationFn: (data: PostHomePopupRequest) => postHomePopup.request(data),
  });
