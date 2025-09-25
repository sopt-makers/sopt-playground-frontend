import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { axiosAuthInstance } from '@/api';
import { createEndpoint } from '@/api/typedAxios';

const createPhoneAuth = createEndpoint({
  request: (data: { userId: number; phone: string }) => ({
    method: 'POST',
    url: '/api/v1/auth/phone',
    data: {
      userId: data.userId,
      phone: data.phone,
      type: 'CHANGE_PHONE_NUMBER',
    },
  }),
  serverResponseScheme: z.object({
    success: z.boolean(),
    message: z.string().nullable(),
    data: z.null(),
  }),
  externalInstance: axiosAuthInstance,
});

export const useCreatePhoneAuth = () => {
  return useMutation({
    mutationFn: (data: { userId: number; phone: string }) =>
      createPhoneAuth.request({
        userId: data.userId,
        phone: data.phone,
      }),
  });
};
