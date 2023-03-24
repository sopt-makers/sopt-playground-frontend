import { DefaultValues } from 'react-hook-form';

import { MemberUploadForm } from '@/components/members/upload/types';

export const DEFAULT_CAREER = { title: '', companyName: '', isCurrent: false, startDate: '', endDate: '' };
export const DEFAULT_ACTIVITY = { generation: '', part: '', team: '해당 없음' };
export const DEFAULT_LINK = { title: '', url: '' };
export const DEFAULT_FAVOR = {
  sweetAndSourPork: null,
  mintChocolate: null,
  alcohol: null,
  peach: null,
  fishBread: null,
  tteokbokki: null,
};

export const MEMBER_DEFAULT_VALUES: DefaultValues<MemberUploadForm> = {
  profileImage: '',
  name: '',
  birthday: { year: '', month: '', day: '' },
  phone: '',
  email: '',
  address: '',
  university: '',
  major: '',
  introduction: '',
  skill: '',
  links: [DEFAULT_LINK],
  activities: [DEFAULT_ACTIVITY],
  allowOfficial: false,
  careers: [DEFAULT_CAREER],
  mbti: null,
  favor: { peach: null, alcohol: null, fishBread: null, tteokbokki: null, sweetAndSourPork: null, mintChocolate: null },
};

export const PARTS = [
  '기획',
  '디자인',
  '서버',
  '안드로이드',
  '웹',
  'iOS',
  '회장',
  '부회장',
  '총무',
  '운영 팀장',
  '미디어 팀장',
  '기획 파트장',
  '디자인 파트장',
  '서버 파트장',
  '웹 파트장',
  '안드로이드 파트장',
  'iOS 파트장',
];

export const TEAMS = ['운영팀', '미디어팀', '해당 없음'];

export const LINK_TITLES = ['Facebook', 'Instagram', 'LinkedIn', 'GitHub', 'Behance'];

export const DEFAULT_DATE = '1970-01-01';

export const SOJU_CAPACITY_RANGE = ['못마셔요', '0.5병', '1병', '1.5병', '2병', '2.5병', '3병 이상'] as const;

export const MBTI_INDICATORS = ['E', 'I', 'N', 'S', 'F', 'T', 'P', 'J'] as const;
