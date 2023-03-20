import { MBTI_INDEX_LIST } from '@/components/members/upload/TmiSection/constants';

export type MbtiIndicatorPosition = 'left' | 'right';

export type Mbti = [
  MbtiIndicatorPosition | null,
  MbtiIndicatorPosition | null,
  MbtiIndicatorPosition | null,
  MbtiIndicatorPosition | null,
];

export type MbtiIndex = typeof MBTI_INDEX_LIST[number];
