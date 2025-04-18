export enum TimecapsopTag {
  PRODUCT_RELEASE = '제품 출시',
  NETWORKING = '네트워킹',
  COLLABORATION_EXPERIENCE = '협업 경험',
  STARTUP = '창업',
  SKILL_UP = '스킬업',
}

export interface Tag {
  key: keyof typeof TimecapsopTag;
  value: TimecapsopTag;
  image: {
    default: string;
    hover: string;
    select: string;
  };
}

export const TAG: Tag[] = [
  {
    key: 'PRODUCT_RELEASE',
    value: TimecapsopTag.PRODUCT_RELEASE,
    image: {
      default: '/icons/icon-release-default.svg',
      hover: '/icons/icon-release-hover.svg',
      select: '/icons/icon-release-select.svg',
    },
  },
  {
    key: 'NETWORKING',
    value: TimecapsopTag.NETWORKING,
    image: {
      default: '/icons/icon-networking-default.svg',
      hover: '/icons/icon-networking-hover.svg',
      select: '/icons/icon-networking-select.svg',
    },
  },
  {
    key: 'COLLABORATION_EXPERIENCE',
    value: TimecapsopTag.COLLABORATION_EXPERIENCE,
    image: {
      default: '/icons/icon-cooperation-default.svg',
      hover: '/icons/icon-cooperation-hover.svg',
      select: '/icons/icon-cooperation-select.svg',
    },
  },
  {
    key: 'STARTUP',
    value: TimecapsopTag.STARTUP,
    image: {
      default: '/icons/icon-startup-default.svg',
      hover: '/icons/icon-startup-hover.svg',
      select: '/icons/icon-startup-select.svg',
    },
  },
  {
    key: 'SKILL_UP',
    value: TimecapsopTag.SKILL_UP,
    image: {
      default: '/icons/icon-skill-default.svg',
      hover: '/icons/icon-skill-hover.svg',
      select: '/icons/icon-skill-select.svg',
    },
  },
];
