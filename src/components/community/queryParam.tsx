import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';

/**
 * 쿼리 파라미터와 연동된 상태를 쉽게 만들 수 있게 해줍니다. paramKey가 쿼리 파라미터의 키가 됩니다.
 */
function createLinkComponent<T extends string>({ paramKey }: { paramKey: T }) {
  type Key = {
    [K in `${T}Id`]: string | undefined;
  };

  const ParamLink = forwardRef<
    HTMLAnchorElement,
    Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'shallow'> & Key
  >((props, ref) => {
    const { pathname, query } = useRouter();
    const value = props[`${paramKey}Id`] as string | undefined;

    const newProps = { ...props };
    delete newProps[`${paramKey}Id`];

    return (
      <Link
        ref={ref}
        {...newProps}
        href={{
          pathname,
          query: {
            ...query,
            [paramKey]: value,
          },
        }}
        shallow
      />
    );
  });

  const useParam = () => {
    return useQueryParam(paramKey, withDefault(StringParam, undefined));
  };

  return [ParamLink, useParam] as const;
}

export const [TagLink, useTagParam] = createLinkComponent({ paramKey: 'tag' });

export const [CategoryLink, useCategoryParam] = createLinkComponent({ paramKey: 'category' });

export const [FeedDetailLink, useFeedDetailParam] = createLinkComponent({ paramKey: 'feed' });
