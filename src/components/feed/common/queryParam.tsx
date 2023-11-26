import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
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
    Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'shallow'> &
      Key & {
        transformQuery?: (query: ParsedUrlQuery) => ParsedUrlQuery;
      }
  >((props, ref) => {
    const { pathname, query } = useRouter();
    const value = props[`${paramKey}Id`] as string | undefined;

    const newProps = { ...props };
    delete newProps[`${paramKey}Id`];

    const newQuery = (props.transformQuery ?? ((param) => param))({
      ...query,
      [paramKey]: value,
    });

    return (
      <Link
        ref={ref}
        {...newProps}
        href={{
          pathname,
          query: newQuery,
        }}
        shallow
      />
    );
  });

  const useParam = (options?: { defaultValue?: string | undefined }) => {
    return useQueryParam(paramKey, withDefault(StringParam, options?.defaultValue ?? undefined));
  };

  return [ParamLink, useParam] as const;
}

export const [CategoryLink, useCategoryParam] = createLinkComponent({ paramKey: 'category' });

export const [FeedDetailLink, useFeedDetailParam] = createLinkComponent({ paramKey: 'feed' });
