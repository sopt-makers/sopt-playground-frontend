// export type MbtiIndicator = 'E' | 'I' | 'N' | 'S' | 'F' | 'T' | 'J' | 'P';

import { MBTI_INDEX_LIST } from '@/components/members/upload/TmiSection/constants';

export type MbtiIndicatorPosition = 'left' | 'right';

export type Mbti = [
  MbtiIndicatorPosition | null,
  MbtiIndicatorPosition | null,
  MbtiIndicatorPosition | null,
  MbtiIndicatorPosition | null,
];

// export type MbtiIndicatorSet = Record<MbtiIndicatorPosition, string>;

export type MbtiIndex = typeof MBTI_INDEX_LIST[number];
