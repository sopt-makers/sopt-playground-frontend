import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const ReviewSchema = z.array(
  z.object({
    id: z.number(),
    content: z.string(),
  }),
);

export const getReviews = createEndpoint({
  request: () => ({
    method: 'GET',
    url: `review`,
  }),
  serverResponseScheme: ReviewSchema,
});
