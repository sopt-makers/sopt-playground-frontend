import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const baseCategory = z.object({
  id: z.number(),
  name: z.string(),
  hasAll: z.boolean(),
  content: z.string().nullable(),
});

type ChildrenCategory = z.infer<typeof baseCategory> & {
  children: ChildrenCategory[];
};

const category: z.ZodType<ChildrenCategory> = baseCategory.extend({
  children: z.lazy(() => category.array()),
});

export const getCategory = createEndpoint({
  request: {
    method: 'GET',
    url: 'api/v1/community/category',
  },
  serverResponseScheme: z.array(category),
});
