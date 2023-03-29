export const menuValue = {
  ALL: '0',
  PM: '1',
  DESIGN: '2',
  WEB: '3',
  SERVER: '4',
  ANDROID: '5',
  iOS: '6',
} as const;

export const MENUS = [
  {
    icon: '/icons/icon-all.svg',
    label: '전체',
    value: menuValue.ALL,
  },
  {
    icon: '/icons/icon-pm.svg',
    label: 'PM',
    value: menuValue.PM,
  },
  {
    icon: '/icons/icon-design.svg',
    label: '디자인',
    value: menuValue.DESIGN,
  },
  {
    icon: '/icons/icon-webpart.svg',
    label: 'WEB',
    value: menuValue.WEB,
  },
  {
    icon: '/icons/icon-server.svg',
    label: 'SERVER',
    value: menuValue.SERVER,
  },
  {
    icon: '/icons/icon-android.svg',
    label: 'Android',
    value: menuValue.ANDROID,
  },
  {
    icon: '/icons/icon-iOS.svg',
    label: 'iOS',
    value: menuValue.iOS,
  },
];
