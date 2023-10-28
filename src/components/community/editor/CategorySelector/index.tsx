import { useState } from 'react';

import CategorySelectorHeader from '@/components/community/editor/CategorySelector/CategorySelectorHeader';
import MainSelector from '@/components/community/editor/CategorySelector/common/MainSelector';

export default function CategorySelector() {
  const [isMainOpen, setIsMainOpen] = useState<boolean | undefined>(true);

  return (
    <>
      <MainSelector isOpen={isMainOpen} onClose={() => setIsMainOpen(false)} />
      <CategorySelectorHeader />
    </>
  );
}
