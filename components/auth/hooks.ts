import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

type TupleKeyObject<T extends readonly string[]> = { [key in T[number]]: string };

export const useStringParam = <T extends readonly string[]>(keys: T, fn?: (obj: TupleKeyObject<T>) => void) => {
  const router = useRouter();
  const [params, setParams] = useState<TupleKeyObject<T> | null>(null);
  const called = useRef(false);

  useEffect(() => {
    const allParamsValid = keys.every((key) => {
      const value = router.query[key];
      return typeof value === 'string';
    });

    if (allParamsValid && !called.current) {
      called.current = true;

      const x = Object.fromEntries(
        keys.map((key) => {
          return [key, router.query[key] as string];
        }),
      );
      setParams(x as TupleKeyObject<T>);
      fn?.(x as TupleKeyObject<T>);
    }
  }, [router, fn, keys]);

  return params;
};
