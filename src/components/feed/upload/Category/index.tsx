import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { useGetMemberProfileOfMe } from '@/api/endpoint_LEGACY/hooks';
import CategoryHeader from '@/components/feed/upload/Category/CategoryHeader';
import CategorySelector from '@/components/feed/upload/Category/CategorySelector';
import TagSelector from '@/components/feed/upload/Category/TagSelector';
import { UploadFeedDataType } from '@/components/feed/upload/types';

interface CateogryProps {
  feedData: UploadFeedDataType;
  onSaveCategory: (categoryId: number) => void;
  onSaveMainCategory: (categoryId: number) => void;
  isDropDown: 'openCategory' | 'openTag' | 'closeAll' | 'openUsingRules';
  openCategory: () => void;
  openTag: () => void;
  openUsingRules: () => void;
  checkIsOpenCategorys: boolean;
}

export default function Category({
  feedData,
  onSaveCategory,
  onSaveMainCategory,
  isDropDown,
  openCategory,
  openTag,
  openUsingRules,
}: CateogryProps) {
  const { data: categories } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  const { data: myProfile } = useGetMemberProfileOfMe();

  const latestSoptPart = useMemo(() => {
    if (!myProfile?.soptActivities || myProfile.soptActivities.length === 0) {
      return null;
    }

    return myProfile.soptActivities.reduce((latestActivity, activity) => {
      if (latestActivity.generation < activity.generation) {
        return activity;
      }
      return latestActivity;
    }, myProfile.soptActivities[0]).part;
  }, [myProfile?.soptActivities]);

  const handleSaveMainCategory = (categoryId: number) => {
    const selectedMainCategory = categories?.find((category) => category.id === categoryId);

    if (selectedMainCategory == null) {
      return;
    }

    onSaveMainCategory(categoryId);

    if (selectedMainCategory.children.length === 0) {
      onSaveCategory(categoryId);
      return;
    }

    openTag();

    if (selectedMainCategory.hasAll) {
      onSaveCategory(categoryId);
      return;
    }

    if (selectedMainCategory.name === '파트') {
      onSaveCategory(
        selectedMainCategory.children.find((category) => category.name === latestSoptPart)?.id ??
          selectedMainCategory.children[0].id,
      );
      return;
    }

    onSaveCategory(selectedMainCategory.children[0].id);
  };

  return (
    <>
      <CategorySelector
        isOpen={isDropDown === 'openCategory'}
        onClose={openUsingRules}
        onSelect={handleSaveMainCategory}
        feedData={feedData}
      />
      <TagSelector
        isOpen={isDropDown === 'openTag'}
        onBack={openCategory}
        onClose={openUsingRules}
        onSave={onSaveCategory}
        feedData={feedData}
      />
      <CategoryHeader feedData={feedData} openCategory={openCategory} openTag={openTag} />
    </>
  );
}
