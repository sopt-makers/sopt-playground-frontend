import { GENERATIONS } from '@/constants/generation';

export type Option<T = string> = {
  value: T;
  label: string;
};

export const FILTER_DEFAULT_OPTION: Option = {
  value: '',
  label: '전체',
};

export const PART_VALUE = {
  PLAN: '1',
  DESIGN: '2',
  WEB: '3',
  SERVER: '4',
  ANDROID: '5',
  iOS: '6',
} as const;

export const TEAM_VALUE = {
  임원진: 'MAKERS',
  운영팀: 'OPERATION',
  미디어팀: 'MEDIA',
} as const;

export const PART_DEFAULT_OPTION: Option = {
  label: '전체',
  value: '',
};

export const PART_OPTIONS: Option[] = [
  {
    label: '기획',
    value: PART_VALUE.PLAN,
  },
  {
    label: '디자인',
    value: PART_VALUE.DESIGN,
  },
  {
    label: '웹',
    value: PART_VALUE.WEB,
  },
  {
    label: '서버',
    value: PART_VALUE.SERVER,
  },
  {
    label: '안드로이드',
    value: PART_VALUE.ANDROID,
  },
  {
    label: 'iOS',
    value: PART_VALUE.iOS,
  },
];

export const GENERATION_DEFAULT_OPTION: Option = {
  value: '',
  label: '전체 기수',
};

export const GENERATION_OPTIONS = (() =>
  GENERATIONS.map((generation) => ({
    value: generation,
    label: `${generation}기`,
  })))();

export const TEAM_OPTIONS: Option[] = [
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

export const MBTI_OPTIONS: Option<(typeof MBTI)[number]>[] = [
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

export const EMPLOYED_OPTIONS: Option[] = [{ value: '1', label: '재직 중' }];

export const ORDER_OPTIONS: Option[] = [
  {
    value: '0',
    label: '멤버 전체',
  },
  {
    value: '1',
    label: '최근등록순',
  },
  {
    value: '2',
    label: '예전등록순',
  },
  {
    value: '3',
    label: '최근활동순',
  },
  {
    value: '4',
    label: '예전활동순',
  },
];
