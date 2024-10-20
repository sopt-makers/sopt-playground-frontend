import { useLayoutEffect, useRef, useState } from 'react';

interface Badge {
  content: string;
  isActive: boolean;
}

export const useVisibleBadges = (badges: Badge[], maxBadgeWidth: number, badgeGap: number) => {
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  badgeRefs.current = badges.map(() => null);
  const [visibleBadges, setAvailableBadges] = useState<typeof badges>(badges);
  const [isBadgeOverflow, setIsBadgeOverflow] = useState<boolean>(false);

  useLayoutEffect(() => {
    const calculateVisibleBadges = () => {
      let totalWidth = 0;
      const visible = [];
      let overflow = false;

      for (let i = 0; i < badges.length; i++) {
        const badgeWidth = badgeRefs.current[i]?.offsetWidth || 0;
        if (totalWidth + badgeWidth > maxBadgeWidth) {
          overflow = true;
          break;
        }
        visible.push(badges[i]);
        totalWidth += badgeWidth + badgeGap;
      }

      setAvailableBadges(visible);
      setIsBadgeOverflow(overflow);
    };

    calculateVisibleBadges();
  }, [badges, maxBadgeWidth, badgeGap]);

  return { visibleBadges, isBadgeOverflow, badgeRefs };
};
