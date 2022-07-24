import { useRouter } from 'next/router';
import { useEffect } from 'react';

type TupleKeyObject<T extends readonly string[]> = { [key in T[number]]: string };

const useStringParam = <T extends readonly string[]>(keys: T, fn: (obj: TupleKeyObject<T>) => void) => {
  const router = useRouter();

  useEffect(() => {
    const allParamsValid = keys.every((key) => {
      const value = router.query[key];
      return typeof value === 'string';
    });

    if (allParamsValid) {
      const x = Object.fromEntries(
        keys.map((key) => {
          return [key, router.query[key] as string];
        }),
      );

      fn(x as TupleKeyObject<T>);
    }
  }, [router, fn, keys]);
};

export default useStringParam;
