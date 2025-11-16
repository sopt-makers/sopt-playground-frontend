import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const HomePopupSchema = z.union([
  z.object({
    id: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    pcImageUrl: z.string(),
    mobileImageUrl: z.string(),
    linkUrl: z.string().nullable(),
    openInNewTab: z.boolean(),
    showOnlyToRecentGeneration: z.boolean(),
  }),
  z.null(),
  z.string(),
]);

export const getHomePopup = createEndpoint({
  request: () => ({
    method: 'GET',
    url: 'api/v1/popups/current',
  }),
  serverResponseScheme: HomePopupSchema,
});

export const useGetHomePopup = () =>
  useQuery({
    queryKey: getHomePopup.cacheKey(),
    queryFn: () => getHomePopup.request(),
  });
