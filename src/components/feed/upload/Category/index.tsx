import { useEffect } from 'react';

import CategoryHeader from '@/components/feed/upload/Category/CategoryHeader';
import CategorySelector from '@/components/feed/upload/Category/CategorySelector';
import TagSelector from '@/components/feed/upload/Category/TagSelector';
import { UploadFeedDataType } from '@/components/feed/upload/types';

interface CateogryProps {
  feedData: UploadFeedDataType;
  onSaveCategory: (categoryId: number) => void;
  onSaveMainCategory: (categoryId: number) => void;
  isDropDown: 'categoryOpen' | 'tagOpen' | 'allClosed' | 'usingRulesOpen';
  categoryOpen: () => void;
  tagOpen: () => void;
  usingRulesOpen: () => void;
}

export default function Category({
  feedData,
  onSaveCategory,
  onSaveMainCategory,
  isDropDown,
  categoryOpen,
  tagOpen,
  usingRulesOpen,
}: CateogryProps) {
  useEffect(() => {
    if (feedData.categoryId == 0) return;
    if (isDropDown == 'usingRulesOpen' || isDropDown == 'allClosed') return;
    if (feedData.categoryId == 1) {
      usingRulesOpen();
    } else {
      tagOpen();
    }
  }, [feedData]);

  const handleSaveMainCategory = (categoryId: number) => {
    onSaveCategory(categoryId);
    onSaveMainCategory(categoryId);
  };

  return (
    <>
      <CategorySelector
        isOpen={isDropDown === 'categoryOpen'}
        onNext={tagOpen}
        onClose={usingRulesOpen}
        onSave={handleSaveMainCategory}
        feedData={feedData}
      />
      {/* 메인 카테고리가 '자유'가 아닌 경우에만 뜨도록 */}
      <TagSelector
        isOpen={isDropDown === 'tagOpen'}
        onBack={categoryOpen}
        onClose={usingRulesOpen}
        onSave={onSaveCategory}
        feedData={feedData}
      />
      <CategoryHeader feedData={feedData} categoryOpen={categoryOpen} tagOpen={tagOpen} />
    </>
  );
}
