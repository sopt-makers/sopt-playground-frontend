export enum TimecapsopTag {
  PRODUCT_RELEASE = '제품 출시',
  NETWORKING = '네트워킹',
  COLLABORATION_EXPERIENCE = '협업 경험',
  STARTUP = '창업',
  SKILL_UP = '스킬업',
}

export interface Tag {
  value: TimecapsopTag;
  image: string;
}

export const TAG: Tag[] = [
  {
    value: TimecapsopTag.PRODUCT_RELEASE,
    image: '/icons/icon-release-default.svg',
  },
  {
    value: TimecapsopTag.NETWORKING,
    image: '/icons/icon-networking-default.svg',
  },
  {
    value: TimecapsopTag.COLLABORATION_EXPERIENCE,
    image: '/icons/icon-cooperation-default.svg',
  },
  {
    value: TimecapsopTag.STARTUP,
    image: '/icons/icon-startup-default.svg',
  },
  {
    value: TimecapsopTag.SKILL_UP,
    image: '/icons/icon-skill-default.svg',
  },
];
