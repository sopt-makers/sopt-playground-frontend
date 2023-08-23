import { useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
  enabled?: boolean;
}

function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  enabled = false,
}: IntersectionObserverOptions = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const ref = useRef(null);

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = ref?.current;

    if (enabled || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current, JSON.stringify(threshold), root, rootMargin, enabled]);

  return { ref, entry, isVisible: !!entry?.isIntersecting };
}

export default useIntersectionObserver;
