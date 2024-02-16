import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/api/endpoint/feed/getCategory';

export default function useCategory() {
  const { data: categoryData } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  const findParentCategory = (categoryId: number | null) => {
    const category =
      categoryData &&
      categoryData.find(
        (category) =>
          // MEMO: 피드 업로드에서는 categoryId자체가 부모 카테고리 id일 수 있습니다.
          category.id === categoryId ||
          (category.children.length > 0 && category.children.some((tag) => tag.id === categoryId)),
      );

    return category;
  };

  const findChildrenCategory = (categoryId: number | null) => {
    const parentCategory = findParentCategory(categoryId);

    const category = (parentCategory && parentCategory.children.find((tag) => tag.id === categoryId)) ?? null;

    return category;
  };

  return { findParentCategory, findChildrenCategory };
}
