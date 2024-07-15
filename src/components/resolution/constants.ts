export enum ResolutionTag {
  ENTREPRENEURSHIP_FOUNDATION = '창업 기반',
  PROBLEM_SOLVING = '문제해결 능력',
  PROFESSIONALISM = '전문성 강화',
  COLLABORATION_EXPERIENCE = '협업 경험',
  PRODUCT_RELEASE = '프로덕트 릴리즈',
  NETWORKING = '네트워킹',
}

export interface Tag {
  icon: string;
  value: ResolutionTag;
}

export const TAG: Tag[] = [
  {
    icon: '🏃',
    value: ResolutionTag.ENTREPRENEURSHIP_FOUNDATION,
  },
  {
    icon: '💡',
    value: ResolutionTag.PROBLEM_SOLVING,
  },
  {
    icon: '📈',
    value: ResolutionTag.PROFESSIONALISM,
  },
  {
    icon: '👩‍👩‍👧‍👦',
    value: ResolutionTag.COLLABORATION_EXPERIENCE,
  },
  {
    icon: '🎉',
    value: ResolutionTag.PRODUCT_RELEASE,
  },
  {
    icon: '🤝🏻',
    value: ResolutionTag.NETWORKING,
  },
];
