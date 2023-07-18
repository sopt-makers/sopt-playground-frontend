export const FEEDBACK_FORM_URL = 'https://forms.gle/FCx5WJ6mDmRuneQi9';
export const NOTIFY_2ND_GENERATION_URL = 'https://forms.gle/AKf164VXtJPGJRoo8';
export const MEMBER_REQUEST_FORM_URL = 'https://forms.gle/Hs9tJgMG9bNvT1rS9';
export const MENTOR_APPLICATION_URL = 'https://forms.gle/iMiCSnqy5oWqAsx47';

export const playgroundLink = {
  memberList: () => `/members`,
  memberDetail: (id: string | number) => `/members/${id}`,
  memberUpload: () => `/members/upload`,
  memberEdit: () => '/members/edit',
  projectList: () => `/projects`,
  projectDetail: (id: string | number) => `/projects/${id}`,
  projectUpload: () => `/projects/upload`,
  projectEdit: (id: string | number) => `/projects/edit/${id}`,
  groupList: () => '/group',
  login: () => `/auth/login`,
  register: () => `/auth/verify`,
  connectSocialAuth: () => `/auth/register`,
  makers: () => `/makers`,
  sopticle: () => `/sopticle`,
  sopticleSuccess: () => `/sopticle/success`,
  mentoringDetail: (id: number) => `/mentoring/${id}`,
  wordchain: () => `/wordchain`,
};
