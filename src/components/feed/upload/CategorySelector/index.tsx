import { useState } from 'react';

import CategorySelectorHeader from '@/components/feed/upload/CategorySelector/CategorySelectorHeader';
import MainSelector from '@/components/feed/upload/CategorySelector/common/MainSelector';
import SubSelector from '@/components/feed/upload/CategorySelector/common/SubSelector';

export default function CategorySelector() {
  const [isMainOpen, setIsMainOpen] = useState<boolean | undefined>(true);

  return (
    <>
      <MainSelector isOpen={isMainOpen} onClose={() => setIsMainOpen(false)} />
      {/* 메인 카테고리가 '자유'가 아닌 경우에만 뜨도록 */}
      <SubSelector
        isOpen={typeof isMainOpen === 'undefined' ? isMainOpen : !isMainOpen}
        onBack={() => setIsMainOpen(true)}
        onClose={() => setIsMainOpen(undefined)}
      />
      <CategorySelectorHeader />
    </>
  );
}
