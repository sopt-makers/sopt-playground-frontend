import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';

import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';

interface PageViewLoggerProps {
  name: string;
}

const PageViewLogger: FC<PageViewLoggerProps> = ({}) => {
  const router = useRouter();
  const { logPageViewEvent } = useEventLogger();
  const isRunRef = useRef(false);

  useEffect(() => {
    if (router.isReady) {
      logPageViewEvent('common', router.query);
    }
  }, [router.isReady, router.query, logPageViewEvent]);

  return null;
};

export default PageViewLogger;
