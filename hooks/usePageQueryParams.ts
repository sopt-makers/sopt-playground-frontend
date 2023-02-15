import { isEmpty, omitBy } from 'lodash-es';
import { NextRouter, useRouter } from 'next/router';
import qs from 'qs';
import { useCallback } from 'react';

interface UsePageQueryParamsOptions {
  /**
   * @default false
   * @desc Object의 value가 nullalbe 하면 해당 key를 제거하여 stringify 합니다.
   * @example { foo: null, bar: 1 } // ?bar=1
   */
  skipNull: boolean;
}
export function usePageQueryParams(
  options: UsePageQueryParamsOptions = {
    skipNull: false,
  },
) {
  const { skipNull } = options;
  const router = useRouter();

  const addQueryParamsToUrl = useCallback(
    (queryParams: NextRouter['query']) => {
      const mergedParams = { ...router.query, ...queryParams };
      const _queryParams = { ...(skipNull ? omitBy(mergedParams, isEmpty) : mergedParams) };

      router.push(
        `${router.pathname}${qs.stringify(_queryParams, {
          addQueryPrefix: true,
        })}`,
        undefined,
        {
          scroll: false,
        },
      );
    },
    [router, skipNull],
  );

  return { addQueryParamsToUrl };
}
