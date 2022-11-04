import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type TupleKeyObject<T extends readonly string[]> = { [key in T[number]]: string };

type RouterQueryResult<Keys extends readonly string[]> =
  | {
      status: 'loading' | 'error';
      query: null;
    }
  | {
      status: 'success';
      query: TupleKeyObject<Keys>;
    };

/**
 * 현재 router.query에 지정된 Key들의 값이 모두 string 타입으로 있나 확인하고 가져옵니다.
 * @param expectedQueryKeys query에서 검사할 Key들의 Tuple
 */
const useStringRouterQuery = <Keys extends readonly string[]>(expectedQueryKeys: Keys): RouterQueryResult<Keys> => {
  const router = useRouter();

  const [result, setResult] = useState<RouterQueryResult<Keys>>({ status: 'loading', query: null });

  useEffect(() => {
    if (router.isReady) {
      const stringValueKeys = expectedQueryKeys.filter((key) => {
        const query = router.query[key];
        return typeof query === 'string';
      });

      if (stringValueKeys.length !== expectedQueryKeys.length) {
        setResult({
          status: 'error',
          query: null,
        });
        return;
      }

      const query = Object.fromEntries(
        stringValueKeys.map((key) => [key, router.query[key] as string]),
      ) as TupleKeyObject<Keys>;

      setResult({
        status: 'success',
        query,
      });
    }
  }, [router, router.isReady]);

  return result;
};

export default useStringRouterQuery;
