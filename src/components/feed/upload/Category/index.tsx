import { useEffect } from 'react';

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
  checkIsOpenCategorys,
}: CateogryProps) {
  useEffect(() => {
    if (feedData.categoryId === 0) return;
    if (checkIsOpenCategorys) return;
    if (feedData.categoryId === 1) {
      openUsingRules();
    } else {
      openTag();
    }
  }, [feedData]);

  const handleSaveMainCategory = (categoryId: number) => {
    onSaveCategory(categoryId);
    onSaveMainCategory(categoryId);
  };

  return (
    <>
      <CategorySelector
        isOpen={isDropDown === 'openCategory'}
        onNext={openTag}
        onClose={openUsingRules}
        onSave={handleSaveMainCategory}
        feedData={feedData}
      />
      {/* 메인 카테고리가 '자유'가 아닌 경우에만 뜨도록 */}
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
