import { ReactNode, useEffect, useRef } from 'react';

interface FooterHeightProviderProps {
  children: (footerRef: React.RefObject<HTMLElement>) => ReactNode;
}

export default function FooterHeightProvider({ children }: FooterHeightProviderProps) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const setFooterHeight = () => {
      el.ownerDocument?.documentElement.style.setProperty('--footer-height', `${el.offsetHeight}px`);
    };

    setFooterHeight();

    const observer = new window.ResizeObserver(setFooterHeight);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return <>{children(footerRef)}</>;
}
