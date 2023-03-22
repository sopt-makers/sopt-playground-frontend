import { MBTI_INDEX_LIST } from '@/components/members/upload/TmiSection/constants';

export type MbtiIndicatorPosition = 'left' | 'right';

export type Mbti = [
  MbtiIndicatorPosition | null,
  MbtiIndicatorPosition | null,
  MbtiIndicatorPosition | null,
  MbtiIndicatorPosition | null,
];

export type MbtiIndex = typeof MBTI_INDEX_LIST[number];

export type FavorSweetAndSourPork = '부먹' | '찍먹';
export type FavorMintChocolate = '민초' | '반민초';
export type FavorAlcohol = '소주' | '맥주';
export type FavorPeach = '딱복' | '물복';
export type FavorFishBread = '팥붕' | '슈붕';
export type FavorTteokbokki = '밀떡' | '쌀떡';
