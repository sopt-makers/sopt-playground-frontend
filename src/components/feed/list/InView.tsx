import { FC, ReactElement, RefObject, useEffect, useRef } from 'react';

interface InViewProps {
  children: (ref: RefObject<HTMLDivElement>) => ReactElement;
  onInView: () => void;
}

const InView: FC<InViewProps> = ({ children, onInView }) => {
  const ref = useRef<HTMLDivElement>(null);
  const callbackRef = useRef<() => void>(onInView);

  useEffect(() => {
    callbackRef.current = onInView;
  }, [onInView]);

  useEffect(() => {
    if (ref.current == null) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callbackRef.current();
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return children(ref);
};

export default InView;
