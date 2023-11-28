import { useState } from 'react';

export function useCategorySelect(initialState: 'openCategory' | 'openTag' | 'closeAll') {
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

  return { isSelectorOpen, closeAll, openCategory, openTag };
}

export function useCategoryUsingRulesPreview(initialState: boolean) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(initialState);

  const openUsingRules = () => {
    const isFirst = localStorage.getItem('isFirst') ?? 'true';
    JSON.parse(isFirst) && setIsPreviewOpen(true);
  };

  const closeUsingRules = () => {
    localStorage.setItem('isFirst', 'false');
    setIsPreviewOpen(false);
  };

  return { isPreviewOpen, openUsingRules, closeUsingRules };
}
