import { playgroundLink } from 'playground-common/export';

import { useCopyText } from '@/hooks/useCopyText';

export const useShareFeed = () => {
  const { copy } = useCopyText();

  const handleShareFeed = (postId: string) => {
    if (typeof window === 'undefined') {
      return;
    }
    copy(`${window.location.origin}${window.location.pathname}${playgroundLink.feedDetail(postId)}`, {
      successMessage: '링크가 복사되었어요.',
    });
  };

  return { handleShareFeed };
};
