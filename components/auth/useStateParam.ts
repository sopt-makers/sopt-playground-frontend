import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

const useStateParam = () => {
  const [param, setParam] = useState('');

  useEffect(() => {
    const savedStateParam = sessionStorage.getItem('stateParam');
    if (!savedStateParam) {
      const newStateParam = nanoid(10);
      sessionStorage.setItem('stateParam', newStateParam);
      setParam(newStateParam);
      return;
    }
    setParam(savedStateParam);
  }, []);

  return param;
};

export default useStateParam;
