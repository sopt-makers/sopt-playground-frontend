import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

type TupleKeyObject<T extends readonly string[]> = { [key in T[number]]: string };

/** @deprecated */
const useQueryStringParam = <Keys extends readonly string[]>(
  keys: Keys,
  onQueryStringChange?: (obj: TupleKeyObject<Keys>) => void,
) => {
  const router = useRouter();
  const [paramObject, setParamObject] = useState<TupleKeyObject<Keys> | null>(null);
  const isExecutedRef = useRef(false);

  useEffect(() => {
    const isAllParamsString = keys.every((key) => {
      const param = router.query[key];
      return typeof param === 'string';
    });

    if (isAllParamsString && !isExecutedRef.current) {
      isExecutedRef.current = true;

      const x = Object.fromEntries(
        keys.map((key) => {
          return [key, router.query[key] as string];
        }),
      );
      setParamObject(x as TupleKeyObject<Keys>);
      onQueryStringChange?.(x as TupleKeyObject<Keys>);
    }
  }, [router, onQueryStringChange, keys]);

  return paramObject;
};

export default useQueryStringParam;
