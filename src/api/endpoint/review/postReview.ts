import { z } from 'zod';

import { axiosAdminInstance } from '@/api';
import { createEndpoint } from '@/api/typedAxios';

export interface RequestBody {
  generation: number;
  part: 'iOS' | 'PLAN' | 'DESIGN' | 'SERVER' | 'ANDROID' | 'WEB';
  mainCategory: '전체 활동' | '서류/면접';
  subActivities?: string[]; // 전체활동 선택 시
  subRecruiting?: '서류/면접' | '서류' | '면접'; // 서류/면접 선택시
  author: string;
  authorProfileImageUrl?: string;
  link: string;
}

export const postReview = createEndpoint({
  request: (requestBody: RequestBody) => ({
    method: 'POST',
    url: `reviews`,
    data: requestBody,
  }),
  serverResponseScheme: z.unknown(),
  axiosInstance: axiosAdminInstance,
});
