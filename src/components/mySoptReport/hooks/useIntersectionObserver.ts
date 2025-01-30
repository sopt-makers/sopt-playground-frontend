import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  id: 'sopt' | 'playground' | 'my-pg',
  handleSetActive: (tab: 'sopt' | 'playground' | 'my-pg') => void,
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log(id);
          handleSetActive(id);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [id, handleSetActive]);

  return ref;
};
