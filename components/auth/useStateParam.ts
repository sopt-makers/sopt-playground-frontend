import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

const useStateParam = () => {
  const [param, setParam] = useState('');

  useEffect(() => {
    const savedParam = sessionStorage.getItem('stateParam');
    if (!savedParam) {
      const newParam = nanoid(10);
      sessionStorage.setItem('stateParam', newParam);
      setParam(newParam);
      return;
    }
    setParam(savedParam);
  }, []);

  return param;
};

export default useStateParam;
