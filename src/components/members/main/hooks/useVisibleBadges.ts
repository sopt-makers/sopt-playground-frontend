import { useLayoutEffect, useRef, useState } from 'react';

interface Badge {
  content: string;
  isActive: boolean;
}

export const useVisibleBadges = <T extends Badge | string>(badges: T[], ellipsisWidth: number, badgeGap: number) => {
  const isCalculated = useRef<boolean>(false);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  badgeRefs.current = badges.map(() => null);
  const badgeWrapperRef = useRef<HTMLDivElement>(null);
  const [visibleBadges, setVisibleBadges] = useState<T[]>(badges);
  const [isBadgeOverflow, setIsBadgeOverflow] = useState<boolean>(false);

  useLayoutEffect(() => {
    // 뱃지 개수가 2이하면 계산 로직 스킵
    if (badges.length <= 1) {
      isCalculated.current = true;
      return;
    }
    if (isCalculated.current) return;

    const calculateVisibleBadges = () => {
      let totalWidth = 0;
      const visible: T[] = [];
      let overflow = false;
      const badgeWrapperWidth = badgeWrapperRef.current?.offsetWidth || 0;

      for (let i = 0; i < badges.length; i++) {
        const badgeWidth = badgeRefs.current[i]?.offsetWidth || 0;

        if (totalWidth + badgeWidth > badgeWrapperWidth - ellipsisWidth) {
          overflow = true;
          break;
        }
        visible.push(badges[i]);
        totalWidth += badgeWidth + badgeGap;
      }
      isCalculated.current = true;
      setVisibleBadges(visible);
      setIsBadgeOverflow(overflow);
    };

    calculateVisibleBadges();
  }, [badges, ellipsisWidth, badgeGap]);

  return { visibleBadges, isBadgeOverflow, badgeRefs, badgeWrapperRef };
};
