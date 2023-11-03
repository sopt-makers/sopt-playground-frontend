import { useState } from 'react';

import CategoryHeader from '@/components/feed/upload/Category/CategoryHeader';
import CategorySelector from '@/components/feed/upload/Category/CategorySelector';
import TagSelector from '@/components/feed/upload/Category/TagSelector';

export default function Category() {
  const [isDropDown, setIsDropDown] = useState<'categoryOpen' | 'tagOpen' | 'allClosed'>('categoryOpen');

  return (
    <>
      <CategorySelector
        isOpen={isDropDown === 'categoryOpen'}
        onNext={() => setIsDropDown('tagOpen')}
        onClose={() => setIsDropDown('allClosed')}
      />
      {/* 메인 카테고리가 '자유'가 아닌 경우에만 뜨도록 */}
      <TagSelector
        isOpen={isDropDown === 'tagOpen'}
        onBack={() => setIsDropDown('categoryOpen')}
        onClose={() => setIsDropDown('allClosed')}
      />
      <CategoryHeader />
    </>
  );
}
