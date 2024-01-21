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

  const findMainCategory = (categoryId: number | null, mainCategoryId?: number | null) => {
    const parentCategory =
      (categoryData &&
        categoryData.find(
          (category) => category.id === mainCategoryId || category.children.some((tag) => tag.id === categoryId),
        )) ??
      null;

    return parentCategory;
  };

  const findChildrenCategory = (categoryId: number | null) => {
    const parentCategory = findMainCategory(categoryId);

    const category = (parentCategory && parentCategory.children.find((tag) => tag.id === categoryId)) ?? null;

    return category;
  };

  return { findParentCategory, findMainCategory, findChildrenCategory };
}
