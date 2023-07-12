import { usePresence } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';

interface CarouselBodyProps {
  currentItemList: ReactNode[];
  renderContainer: (children: ReactNode) => ReactNode;
}

export default function CarouselBody({ currentItemList, renderContainer }: CarouselBodyProps) {
  const [isPresent, safeToRemove] = usePresence();
  const absoluteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (absoluteRef.current === null) {
      return;
    }
    if (isPresent) {
      absoluteRef.current.style.position = 'static';
    } else {
      absoluteRef.current.style.position = 'absolute';
      safeToRemove?.();
    }
  }, [isPresent, safeToRemove]);

  return <div ref={absoluteRef}>{renderContainer(currentItemList)}</div>;
}
