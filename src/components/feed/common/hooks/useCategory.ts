import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/api/endpoint/feed/getCategory';

export default function useCategory() {
  const { data: categoryData } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  const findParentCategory = (categoryId: number) => {
    const category =
      categoryData &&
      categoryData.find((category) =>
        category.children.length > 0
          ? category.children.some((tag) => tag.id === categoryId)
          : category.id === categoryId,
      );

    return category;
  };

  return { findParentCategory };
}
