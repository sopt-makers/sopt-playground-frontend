import React, { useEffect } from 'react';

import { getWinners } from '@/api/endpoint/wordchain/getWinners';

const WordchainPage = () => {
  useEffect(() => {
    (async () => {
      const data = await getWinners.request();
      console.log('winners', data);
    })();
  }, []);

  return <div>WordchainPage</div>;
};

export default WordchainPage;
