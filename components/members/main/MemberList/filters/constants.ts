import { ReactNode } from 'react';

import { GENERATIONS } from '@/constants/generation';

type Option<T = string> = {
  value: T;
  label: ReactNode;
};

export const GENERATION_DEFAULT_OPTION: Option = {
  value: '',
  label: '전체 기수',
};

export const GENERATION_OPTIONS = (() =>
  GENERATIONS.map((generation) => ({
    value: generation,
    label: `${generation}기`,
  })))();

export const TEAM_OPTIONS = [
  { value: '임원진', label: '임원진' },
  { value: '운영팀', label: '운영팀' },
  { value: '미디어팀', label: '미디어팀' },
];

export const MBTI = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
] as const;

export const MBTI_OPTIONS: Option<typeof MBTI[number]>[] = [
  { value: 'ISTJ', label: 'ISTJ' },
  { value: 'ISFJ', label: 'ISFJ' },
  { value: 'INFJ', label: 'INFJ' },
  { value: 'INTJ', label: 'INTJ' },
  { value: 'ISTP', label: 'ISTP' },
  { value: 'ISFP', label: 'ISFP' },
  { value: 'INFP', label: 'INFP' },
  { value: 'INTP', label: 'INTP' },
  { value: 'ESTP', label: 'ESTP' },
  { value: 'ESFP', label: 'ESFP' },
  { value: 'ENFP', label: 'ENFP' },
  { value: 'ENTP', label: 'ENTP' },
  { value: 'ESTJ', label: 'ESTJ' },
  { value: 'ESFJ', label: 'ESFJ' },
  { value: 'ENFJ', label: 'ENFJ' },
  { value: 'ENTJ', label: 'ENTJ' },
];

export const SOJU_CAPACITY_OPTIONS: Option[] = [
  { value: '0', label: '못마셔요' },
  { value: '0.5', label: '0.5병' },
  { value: '1', label: '1병' },
  { value: '1.5', label: '1.5병' },
  { value: '2', label: '2병' },
  { value: '2.5', label: '2.5병' },
  { value: '3', label: '3병 이상' },
];
