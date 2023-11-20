import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/api/endpoint/feed/getCategory';

export function useCategoryInfo(categoryId: string | undefined) {
  const { data: categoryInfo } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
    enabled: categoryId != null,
    select: (categories) => {
      const category = categories.find((category) => `${categoryId}` === `${category.id}`);

      if (category != null) {
        return {
          category,
          tag: null,
        } as const;
      }

      const parentCategory = categories.find((category) => category.children.some((tag) => `${tag.id}` === categoryId));
      const tag = parentCategory?.children.find((tag) => `${tag.id}` === `${categoryId}`);

      return {
        category: parentCategory,
        tag,
      } as const;
    },
  });

  return categoryInfo;
}
