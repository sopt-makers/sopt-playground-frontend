import { RefObject, useEffect, useState } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  ref: RefObject<Element>,
  { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false }: IntersectionObserverOptions = {},
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = ref?.current;

    if (frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current, JSON.stringify(threshold), root, rootMargin, frozen]);

  return { entry, isVisible: Boolean(entry?.isIntersecting) };
}

export default useIntersectionObserver;
