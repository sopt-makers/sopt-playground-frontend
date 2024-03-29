import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { useGetMemberProfileOfMe } from '@/api/endpoint_LEGACY/hooks';
import CategoryHeader from '@/components/feed/upload/Category/CategoryHeader';
import CategorySelector from '@/components/feed/upload/Category/CategorySelector';
import TagSelector from '@/components/feed/upload/Category/TagSelector';
import { useCategorySelect } from '@/components/feed/upload/hooks/useCategorySelect';
import { FeedDataType } from '@/components/feed/upload/types';

interface CateogryProps {
  feedData: FeedDataType;
  onSaveCategory: (categoryId: number) => void;
  openUsingRules: () => void;
  closeUsingRules: () => void;
  isEdit?: boolean;
}

export default function Category({ feedData, onSaveCategory, openUsingRules, closeUsingRules, isEdit }: CateogryProps) {
  const { isSelectorOpen, closeAll, openCategory, openTag } = useCategorySelect(isEdit ? 'closeAll' : 'openCategory');

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

  const handleSaveParentCategory = (categoryId: number) => {
    const selectedMainCategory = categories?.find((category) => category.id === categoryId);

    if (selectedMainCategory == null) {
      return;
    }

    onSaveCategory(categoryId);

    if (selectedMainCategory.children.length === 0) {
      onSaveCategory(categoryId);
      closeAll();
      openUsingRules();
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

    if (selectedMainCategory.children.length > 0) {
      onSaveCategory(selectedMainCategory.children[0].id);
    } else {
      onSaveCategory(selectedMainCategory.id);
    }

    closeAll();
  };

  const handleCloseTag = () => {
    openUsingRules();
    closeAll();
  };

  return (
    <>
      <CategorySelector
        isOpen={isSelectorOpen === 'openCategory'}
        onClose={closeAll}
        onSelect={handleSaveParentCategory}
        feedData={feedData}
      />
      <TagSelector
        isOpen={isSelectorOpen === 'openTag'}
        onBack={openCategory}
        onClose={handleCloseTag}
        onSave={onSaveCategory}
        feedData={feedData}
      />
      <CategoryHeader feedData={feedData} openCategory={openCategory} openTag={openTag} />
    </>
  );
}
