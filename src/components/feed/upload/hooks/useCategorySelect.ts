import { useState } from 'react';

export function useCategorySelect(initialState: 'categoryOpen' | 'tagOpen' | 'allClosed' | 'usingRulesOpen') {
  const [isDropDown, setIsDropDown] = useState(initialState);

  const allClosed = () => {
    setIsDropDown('allClosed');
  };

  const categoryOpen = () => {
    setIsDropDown('categoryOpen');
  };

  const tagOpen = () => {
    setIsDropDown('tagOpen');
  };

  const usingRulesOpen = () => {
    setIsDropDown('usingRulesOpen');
  };

  return { isDropDown, allClosed, categoryOpen, tagOpen, usingRulesOpen };
}
