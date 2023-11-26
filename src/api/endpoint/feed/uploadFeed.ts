import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

interface RequestBody {
  categoryId: number;
  title: string | null;
  content: string;
  isQuestion: boolean;
  isBlindWriter: boolean;
  images: string[];
}

export const uploadFeed = createEndpoint({
  request: (reqeustBody: RequestBody) => ({
    method: 'POST',
    url: 'api/v1/community/posts',
    data: reqeustBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const useSaveUploadFeedData = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (reqeustBody: RequestBody) => uploadFeed.request(reqeustBody),
    onSuccess: () => {
      router.push('/community');
    },
  });
};
