export const FEEDBACK_FORM_URL = 'https://forms.gle/FCx5WJ6mDmRuneQi9';
export const NOTIFY_2ND_GENERATION_URL = 'https://forms.gle/AKf164VXtJPGJRoo8';
export const MEMBER_REQUEST_FORM_URL = 'https://forms.gle/Hs9tJgMG9bNvT1rS9';
export const MENTOR_APPLICATION_URL = 'https://forms.gle/iMiCSnqy5oWqAsx47';
export const MAKERS_TEAM_URL =
  'https://makers.sopt.org/?utm_source=playground&utm_medium=footer&utm_campaign=recruiting&utm_id=3rd_makers';
export const PLAYGROUND_ORIGIN =
  process.env.NODE_ENV === 'development' ? `https://sopt-internal-dev.pages.dev` : `https://playground.sopt.org`;

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
  intro: () => `/intro`,
  login: () => `/auth/login`,
  register: () => `/auth/verify`,
  resetLogin: () => `/auth/reset`,
  reconnectSocialAuth: () => `/auth/reconnect`,
  connectSocialAuth: () => `/auth/register`,
  makers: () => `/makers`,
  sopticle: () => `/sopticle`,
  sopticleSuccess: () => `/sopticle/success`,
  mentoringDetail: (id: number) => `/mentoring/${id}`,
  wordchain: () => `/wordchain`,
  feedList: () => `/community`,
  feedDetail: (id: string | number) => `/feed/${id}`,
  feedUpload: () => `/community/upload`,
};
