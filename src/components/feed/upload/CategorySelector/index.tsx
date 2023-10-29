import { useState } from 'react';

import CategoryDropDown from '@/components/feed/upload/CategorySelector/CategoryDropDown';
import CategoryHeader from '@/components/feed/upload/CategorySelector/CategoryHeader';
import TagDropDown from '@/components/feed/upload/CategorySelector/TagDropDown';

export default function CategorySelector() {
  const [isDropDown, setIsDropDown] = useState<'categoryOpen' | 'tagOpen' | 'allClosed'>('categoryOpen');

  return (
    <>
      <CategoryDropDown
        isOpen={isDropDown === 'categoryOpen'}
        onNext={() => setIsDropDown('tagOpen')}
        onClose={() => setIsDropDown('allClosed')}
      />
      {/* 메인 카테고리가 '자유'가 아닌 경우에만 뜨도록 */}
      <TagDropDown
        isOpen={isDropDown === 'tagOpen'}
        onBack={() => setIsDropDown('categoryOpen')}
        onClose={() => setIsDropDown('allClosed')}
      />
      <CategoryHeader />
    </>
  );
}
