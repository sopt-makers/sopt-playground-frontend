import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { postPostHit } from '@/api/endpoint/feed/postPostHit';

export const useHit = () => {
  const { mutate } = useMutation({
    mutationFn: (ids: string[]) => postPostHit.request(ids),
  });

  const viewedSet = useRef(new Set<string>());
  const timeoutTokenRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const handleFeedImpression = (feedId: string) => {
    viewedSet.current.add(feedId);
    scheduleProcess();
  };

  const scheduleProcess = () => {
    if (timeoutTokenRef.current != null) {
      return;
    }

    // 페이지를 벗어나도 조회수 요청이 나가도록 일부러 cleanup 때 정리 안함
    timeoutTokenRef.current = setTimeout(() => {
      const ids = [...viewedSet.current.values()];
      if (ids.length > 0) {
        mutate(ids);
      }

      viewedSet.current.clear();
      timeoutTokenRef.current = null;
    }, 5000);
  };

  return {
    queueHit: handleFeedImpression,
  };
};
