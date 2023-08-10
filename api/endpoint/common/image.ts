import axios from 'axios';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getPresignedUrl = createEndpoint({
  request: ({ filename, type }: { filename: string; type?: string }) => ({
    method: 'GET',
    url: 'api/v1/presigned-url',
    params: {
      filename,
      type,
    },
  }),
  serverResponseScheme: z.object({
    filename: z.string(),
    signedUrl: z.string(),
  }),
});

export const putPresignedUrl = async ({ file, signedUrl }: { file: File; signedUrl: string }) => {
  await axios.request({
    method: 'PUT',
    baseURL: decodeURIComponent(signedUrl),
    headers: { 'Content-Type': file.type },
    data: file,
  });
};
