import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type TupleKeyObject<T extends readonly string[]> = { [key in T[number]]: string };

type URLStringQueryResult<Keys extends readonly string[]> =
  | {
      status: 'loading' | 'error';
      query: null;
    }
  | {
      status: 'success';
      query: TupleKeyObject<Keys>;
    };

const useURLStringQuery = <Keys extends readonly string[]>(keys: Keys): URLStringQueryResult<Keys> => {
  const router = useRouter();

  const [result, setResult] = useState<URLStringQueryResult<Keys>>({ status: 'loading', query: null });

  useEffect(() => {
    if (router.isReady) {
      const stringDataKeys = keys.filter((key) => {
        const query = router.query[key];
        return typeof query === 'string';
      });

      if (stringDataKeys.length !== keys.length) {
        setResult({
          status: 'error',
          query: null,
        });
        return;
      }

      const query = Object.fromEntries(
        stringDataKeys.map((key) => [key, router.query[key] as string]),
      ) as TupleKeyObject<Keys>;

      setResult({
        status: 'success',
        query,
      });
    }
  }, [router, router.isReady]);

  return result;
};

export default useURLStringQuery;
