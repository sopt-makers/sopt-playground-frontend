import { useState } from 'react';

import CategoryHeader from '@/components/feed/upload/Category/CategoryHeader';
import CategorySelector from '@/components/feed/upload/Category/CategorySelector';
import TagSelector from '@/components/feed/upload/Category/TagSelector';

interface CateogryProps {
  categoryId: number;
  onSave: (categoryId: number) => void;
}

export default function Category({ categoryId, onSave }: CateogryProps) {
  const [isDropDown, setIsDropDown] = useState<'categoryOpen' | 'tagOpen' | 'allClosed'>('categoryOpen');

  return (
    <>
      <CategoryHeader categoryId={categoryId} setIsDropDown={setIsDropDown} />
      <CategorySelector
        isOpen={isDropDown === 'categoryOpen'}
        onNext={() => setIsDropDown('tagOpen')}
        onClose={() => setIsDropDown('allClosed')}
        onSave={onSave}
      />
      {/* 메인 카테고리가 '자유'가 아닌 경우에만 뜨도록 */}
      <TagSelector
        isOpen={isDropDown === 'tagOpen'}
        onBack={() => setIsDropDown('categoryOpen')}
        onClose={() => setIsDropDown('allClosed')}
        onSave={onSave}
      />
    </>
  );
}
