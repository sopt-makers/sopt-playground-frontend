import { useLayoutEffect, useRef, useState } from 'react';

interface Badge {
  content: string;
  isActive: boolean;
}

export const useVisibleBadges = (badges: Badge[], ellipsisWidth: number, badgeGap: number) => {
  const isCalculated = useRef<boolean>(false);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  badgeRefs.current = badges.map(() => null);
  const badgeWrapperRef = useRef<HTMLDivElement>(null);
  const [visibleBadges, setAvailableBadges] = useState<typeof badges>(badges);
  const [isBadgeOverflow, setIsBadgeOverflow] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (isCalculated.current) return;

    const calculateVisibleBadges = () => {
      let totalWidth = 0;
      const visible = [];
      let overflow = false;
      const badgeWrapperWidth = badgeWrapperRef.current?.offsetWidth || 0;

      for (let i = 0; i < badges.length; i++) {
        const badgeWidth = badgeRefs.current[i]?.offsetWidth || 0;
        console.log('here', badgeWrapperWidth);
        if (totalWidth + badgeWidth > badgeWrapperWidth - ellipsisWidth) {
          overflow = true;
          break;
        }
        visible.push(badges[i]);
        totalWidth += badgeWidth + badgeGap;
      }
      isCalculated.current = true;
      setAvailableBadges(visible);
      setIsBadgeOverflow(overflow);
    };

    calculateVisibleBadges();
  }, [badges, ellipsisWidth, badgeGap]);

  return { visibleBadges, isBadgeOverflow, badgeRefs, badgeWrapperRef };
};
