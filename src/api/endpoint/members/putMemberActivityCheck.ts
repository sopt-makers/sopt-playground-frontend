import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEndpoint } from '@/api/typedAxios';

/**
 * @desc 멤버 활동 정보 확인
 */
export const putMemberActivityCheck = createEndpoint({
  request: (body: { isCheck: boolean }) => ({
    method: 'PUT',
    url: 'api/v1/members/activity/check',
    data: body,
  }),
  serverResponseScheme: z.object({
    '유저 기수 확인 여부가 변경됐습니다.': z.boolean(),
  }),
});

export const usePutMemberActivityCheck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { isCheck: boolean }) => putMemberActivityCheck.request(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMemberProfileOfMe'] });
      queryClient.invalidateQueries({ queryKey: ['getMemberOfMe'] });
    },
  });
};
