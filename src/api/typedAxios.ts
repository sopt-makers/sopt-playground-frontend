import { AxiosRequestConfig } from 'axios';
import { z } from 'zod';

import { axiosInstance } from '@/api';
import { DEBUG } from '@/constants/env';

interface Endpoint<ServerResponse, Params extends unknown[]> {
  request(...params: Params): Promise<ServerResponse>;
  cacheKey(...params: Params): [...keys: string[], ...params: Params];
}

export function createEndpoint<
  Validator extends z.ZodType,
  Param extends unknown[] = [],
  Transformed = z.infer<Validator>,
>(config: {
  request: AxiosRequestConfig | ((...params: Param) => AxiosRequestConfig);
  serverResponseScheme: Validator;
  transformer?: (original: z.infer<Validator>) => Transformed;
  externalInstance?: typeof axiosInstance;
}): Endpoint<Transformed, Param> {
  const getConfig = (params: Param) => {
    if (typeof config.request === 'function') {
      return config.request(...params);
    }
    return config.request;
  };

  return {
    async request(...params) {
      const axiosConfig = getConfig(params);
      const instance = config.externalInstance ?? axiosInstance; // 외부 api 사용할 때는 외부 instance 사용

      const { data } = await instance.request<unknown>(axiosConfig);

      const res = config.serverResponseScheme.safeParse(data);

      if (!res.success) {
        const zodError = String(res.error).slice(0, 1000) + '\n...';
        const message = `서버 타입 검증에 실패했습니다. (${axiosConfig.method} ${axiosConfig.url})\n${zodError}`;
        console.error(message, zodError);

        if (DEBUG) {
          throw new Error(message);
        }

        return data;
      }

      return res.data;
    },
    cacheKey(...params) {
      const axiosConfig = getConfig(params);

      return [axiosConfig.method ?? 'GET', axiosConfig.url ?? '', ...params];
    },
  };
}

export type GetResponseType<T> = T extends Endpoint<infer R, unknown[]> ? R : never;
