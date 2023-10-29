import { useState } from 'react';

import CategoryDropDown from '@/components/feed/upload/CategorySelector/CategoryDropDown';
import CategoryHeader from '@/components/feed/upload/CategorySelector/CategoryHeader';
import TagDropDown from '@/components/feed/upload/CategorySelector/TagDropDown';

export default function CategorySelector() {
  const [isDropDown, setIsDropDown] = useState<'mainOpen' | 'subOpen' | 'allClosed'>('mainOpen');

  return (
    <>
      <CategoryDropDown
        isOpen={isDropDown === 'mainOpen'}
        onNext={() => setIsDropDown('subOpen')}
        onClose={() => setIsDropDown('allClosed')}
      />
      {/* 메인 카테고리가 '자유'가 아닌 경우에만 뜨도록 */}
      <TagDropDown
        isOpen={isDropDown === 'subOpen'}
        onBack={() => setIsDropDown('mainOpen')}
        onClose={() => setIsDropDown('allClosed')}
      />
      <CategoryHeader />
    </>
  );
}
