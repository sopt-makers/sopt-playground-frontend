export const BLOG_OPTIONS = [
  { value: '전체 활동', label: '전체 활동 후기' },
  { value: '서류/면접', label: '서류/면접 후기' },
];

export type BlogOptionValue = '전체 활동' | '서류/면접';

export const RECRUIT_OPTIONS = [
  { value: '서류', label: '서류' },
  { value: '면접', label: '면접' },
  { value: '서류/면접', label: '서류/면접' },
];

export const ACTIVITY_OPTIONS = [
  { value: '전체', label: '전체' },
  { value: '앱잼', label: '앱잼' },
  { value: '솝커톤', label: '솝커톤' },
  { value: '세미나', label: '세미나' },
  { value: '스터디', label: '스터디' },
  { value: '솝텀', label: '솝텀' },
  { value: '메이커스', label: '메이커스' },
];

export const PART_KR_TO_ENUM = {
  기획: 'PLAN',
  웹: 'WEB',
  서버: 'SERVER',
  안드로이드: 'ANDROID',
  디자인: 'DESIGN',
  iOS: 'iOS',
} as const;
