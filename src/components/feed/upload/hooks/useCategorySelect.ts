import { useState } from 'react';

export function useCategorySelect(initialState: 'openCategory' | 'openTag' | 'closeAll' | 'openUsingRules') {
  const [isDropDown, setIsDropDown] = useState(initialState);

  const closeAll = () => {
    setIsDropDown('closeAll');
  };

  const openCategory = () => {
    setIsDropDown('openCategory');
  };

  const openTag = () => {
    setIsDropDown('openTag');
  };

  const openUsingRules = () => {
    setIsDropDown('openUsingRules');
  };

  return { isDropDown, closeAll, openCategory, openTag, openUsingRules };
}
