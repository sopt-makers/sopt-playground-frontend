import { QS } from '@toss/utils';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export interface ProjectsRequestParams {
  limit?: number;
  cursor?: number;
  name?: string;
}

const LinkSchema = z.object({
  linkId: z.number(),
  linkTitle: z.string(),
  linkUrl: z.string(),
});

const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  generation: z.number(),
  category: z.string(),
  serviceType: z.array(z.string()),
  summary: z.string(),
  detail: z.string(),
  logoImage: z.string(),
  thumbnailImage: z.string(),
  links: z.array(LinkSchema),
});

export const getProjects = (params: ProjectsRequestParams) =>
  createEndpoint({
    request: {
      method: 'GET',
      url: 'api/v1/projects',
      data: QS.create({ params }),
    },
    serverResponseScheme: z.object({
      projectList: z.array(ProjectSchema),
      hasNext: z.boolean(),
    }),
  });
