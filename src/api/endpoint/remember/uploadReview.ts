import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface RequestBody {
  content: string;
}

export const uploadReview = createEndpoint({
  request: (reqeustBody: RequestBody) => ({
    method: 'POST',
    url: 'review/upload',
    data: reqeustBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const useUploadReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reqeustBody: RequestBody) => uploadReview.request(reqeustBody),
    onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: useGetReviewsInfiniteQuery.getKey('') }); // review
    },
  });
};
