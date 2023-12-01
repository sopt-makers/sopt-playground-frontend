import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

import { postPostHit } from '@/api/endpoint/feed/postPostHit';

export const useHit = () => {
  const { mutate } = useMutation({
    mutationFn: (ids: string[]) => postPostHit.request(ids),
  });

  const viewedSet = useRef(new Set<string>());
  const timeoutTokenRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const handleFeedImpression = (feedId: string) => {
    viewedSet.current.add(feedId);
    fn();
  };

  const fn = () => {
    if (timeoutTokenRef.current != null) {
      return;
    }

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
