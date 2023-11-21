import { useState } from 'react';

export function useCategorySelect(initialState: 'openCategory' | 'openTag' | 'closeAll' | 'openUsingRules') {
  const [isSelectorOpen, setisSelectorOpen] = useState(initialState);

  const closeAll = () => {
    setisSelectorOpen('closeAll');
  };

  const openCategory = () => {
    setisSelectorOpen('openCategory');
  };

  const openTag = () => {
    setisSelectorOpen('openTag');
  };

  const openUsingRules = () => {
    setisSelectorOpen('openUsingRules');
  };

  return { isSelectorOpen, closeAll, openCategory, openTag, openUsingRules };
}
