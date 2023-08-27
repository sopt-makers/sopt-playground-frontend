import { MBTI_INDICATORS } from '@/components/members/upload/constants';

export type MbtiIndicator = typeof MBTI_INDICATORS[number];

export type Mbti = ['E' | 'I' | null, 'N' | 'S' | null, 'F' | 'T' | null, 'P' | 'J' | null];

export type FavorSweetAndSourPork = '부먹' | '찍먹';
export type FavorMintChocolate = '민초' | '반민초';
export type FavorAlcohol = '소주' | '맥주';
export type FavorPeach = '딱복' | '물복';
export type FavorFishBread = '팥붕' | '슈붕';
export type FavorTteokbokki = '밀떡' | '쌀떡';

export const isMbti = (mbti: (string | null)[]): mbti is Mbti => {
  return mbti.every(
    (mbtiIndicator) => MBTI_INDICATORS.includes(mbtiIndicator as MbtiIndicator) || mbtiIndicator === null,
  );
};
