import { useContext } from 'react';

import { SlideUpContext } from '@/components/common/SlideUp/context';
import { SlideUpOption } from '@/components/common/SlideUp/types';

const useSlideUp = () => {
  const controller = useContext(SlideUpContext);

  return {
    show(slidUp: SlideUpOption) {
      controller.show(slidUp);
    },
    close() {
      controller.close();
    },
  };
};

export default useSlideUp;
