import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface FooterHeightProviderProps {
  children: (footerRef: React.RefObject<HTMLElement>, ready: boolean) => ReactNode;
}

export default function FooterHeightProvider({ children }: FooterHeightProviderProps) {
  const footerRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    const setFooterHeight = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(() => {
          const height = el.offsetHeight;
          if (height > 0) {
            el.ownerDocument?.documentElement.style.setProperty('--footer-height', `${height}px`);
            setReady(true);
          }
        });
      }, 100);
    };

    setFooterHeight();

    const observer = new window.ResizeObserver(setFooterHeight);
    observer.observe(el);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return <>{children(footerRef, ready)}</>;
}
