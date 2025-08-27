export const FEEDBACK_FORM_URL = 'https://forms.gle/FCx5WJ6mDmRuneQi9';
export const NOTIFY_2ND_GENERATION_URL = 'https://forms.gle/AKf164VXtJPGJRoo8';
export const MEMBER_REQUEST_FORM_URL = 'https://forms.gle/Hs9tJgMG9bNvT1rS9';
export const MENTOR_APPLICATION_URL = 'https://forms.gle/iMiCSnqy5oWqAsx47';
export const COFFEECHAT_GUIDE = 'https://www.notion.so/sopt-makers/87ca4563b6ec49528b7d34372edff677?pvs=4';
export const MAKERS_TEAM_URL =
  'https://makers.sopt.org/?utm_source=playground&utm_medium=footer&utm_campaign=recruiting&utm_id=3rd_makers';
export const PLAYGROUND_ORIGIN =
  process.env.NODE_ENV === 'development' ? `https://sopt-internal-dev.pages.dev` : `https://playground.sopt.org`;

export const playgroundLink = {
  memberList: () => `/members`,
  memberDetail: (id: string | number) => `/members/${id}`,
  memberUpload: () => `/members/upload`,
  memberEdit: () => '/members/edit',
  memberCheckSoptActivity: () => '/members/checkSoptActivity',
  projectList: () => `/projects`,
  projectDetail: (id: string | number) => `/projects/${id}`,
  projectUpload: () => `/projects/upload`,
  projectEdit: (id: string | number) => `/projects/edit/${id}`,
  groupList: () => '/group',
  groupDetail: (id: string | number) => `/group/detail?id=${id}`,
  intro: () => `/intro`,
  login: () => `/accounts`,
  register: () => `/auth/verify`,
  resetLogin: () => `/auth/reset`,
  reconnectSocialAuth: () => `/auth/reconnect`,
  connectSocialAuth: () => `/auth/register`,
  makers: () => `/makers`,
  blog: () => `/blog`,
  blogSuccess: () => `/blog/success`,
  mentoringDetail: (id: number) => `/mentoring/${id}`,
  wordchain: () => `/wordchain`,
  feedList: () => `/`,
  feedDetail: (id: string | number) => `/feed/${id}`,
  feedUpload: () => `/feed/upload`,
  feedEdit: (id: string | number) => `/feed/edit/${id}`,
  remember: () => `/remember`,
  coffeechatUpload: () => `/coffeechat/upload`,
  coffeechatEdit: (id: string | number) => `/coffeechat/edit/${id}`,
  coffeechat: () => `/coffeechat`,
  coffeechatDetail: (id: string | number) => `/coffeechat/${id}`,
  mySoptReport: () => `/mySoptReport`,
  accounts: () => `/accounts`,
};
