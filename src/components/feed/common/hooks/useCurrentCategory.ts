import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/api/endpoint/feed/getCategory';

export function useCurrentCategory(categoryId: string | undefined) {
  const { data: currentCategory } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
    enabled: categoryId != null,
    select: (categories) => {
      const category = categories.find((category) => `${categoryId}` === `${category.id}`);

      if (category != null) {
        return {
          categoryName: category.name,
          tagName: '전체',
        };
      }

      const parentCategory = categories.find((category) => category.children.some((tag) => `${tag.id}` === categoryId));
      const tag = parentCategory?.children.find((tag) => `${tag.id}` === `${categoryId}`);

      return {
        categoryName: parentCategory?.name,
        tagName: tag?.name,
      };
    },
  });

  return currentCategory;
}
