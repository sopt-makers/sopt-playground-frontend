import { useQuery } from '@tanstack/react-query';
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

export const HomePopupResponseSchema = z.array(HomePopupSchema);

export const getHomePopup = createEndpoint({
  request: () => ({
    method: 'GET',
    url: 'api/v1/popups',
    headers: {
      'admin-key': ADMIN_KEY,
    },
  }),
  serverResponseScheme: HomePopupResponseSchema,
});

export const useGetHomePopup = () =>
  useQuery({
    queryKey: getHomePopup.cacheKey(),
    queryFn: () => getHomePopup.request(),
  });
