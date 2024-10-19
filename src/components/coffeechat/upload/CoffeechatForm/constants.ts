export const CAREER_LEVEL = [
  '아직 없어요',
  '인턴 경험만 있어요',
  '주니어 (0-3년)',
  '미들 (4-8년)',
  '시니어 (9년 이상)',
] as const;

export const COFFECHAT_SECTION = ['SOPT 활동', '기획', '디자인', '프론트', '백엔드', '앱 개발', '기타'] as const;

export const COFFECHAT_TOPIC = [
  '창업',
  '네트워킹',
  '커리어',
  '포트폴리오',
  '이력서/자소서',
  '면접',
  '직무 전문성',
  '프로젝트',
  '자기계발',
  '기타',
] as const;

export const MEETING_TYPE = ['온라인', '오프라인', '온/오프라인'] as const;

export const MEETING_TYPE_OPTIONS = [
  {
    label: '온라인',
    value: 1,
  },
  {
    label: '오프라인',
    value: 2,
  },
  {
    label: '온/오프라인',
    value: 3,
  },
];
