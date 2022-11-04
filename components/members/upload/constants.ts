import { DefaultValues } from 'react-hook-form';

import { MemberUploadForm } from '@/components/members/upload/types';

const LATEST_GENERATION = 31;

export const GENERATION = Array.from({ length: LATEST_GENERATION }, (_, i) => (i + 1).toString()).reverse();

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
  links: [{ title: '', url: '' }],
  activities: [{ generation: '', part: '', team: '' }],
  openToWork: false,
  openToSideProject: false,
  allowOfficial: false,
};

export const PART = ['기획', '디자인', '서버', '안드로이드', '웹', 'iOS'];

export const TEAM = ['운영팀', '미디어팀', '해당 없음'];
