import { AxiosRequestConfig } from 'axios';
import { z } from 'zod';

import { axiosInstance } from '@/api';

interface Endpoint<ServerResponse, Params extends unknown[]> {
  request(...params: Params): Promise<ServerResponse>;
}

export function createEndpoint<
  Validator extends z.ZodType,
  Param extends unknown[] = [],
  Transformed = z.infer<Validator>,
>(config: {
  request: AxiosRequestConfig | ((...params: Param) => AxiosRequestConfig);
  serverResponse: Validator;
  transformer?: (original: z.infer<Validator>) => Transformed;
}): Endpoint<Transformed, Param> {
  return {
    async request(...params) {
      const getConfig = () => {
        if (typeof config.request === 'function') {
          return config.request(...params);
        }
        return config.request;
      };

      const { data } = await axiosInstance.request<unknown>(getConfig());

      const res = config.serverResponse.safeParse(data);

      if (!res.success) {
        throw new Error('');
      }

      return res.data;
    },
  };
}

export type GetResponseType<T> = T extends Endpoint<infer R, never> ? R : never;
