export const FEEDBACK_FORM_URL = 'https://forms.gle/FCx5WJ6mDmRuneQi9';
export const NOTIFY_2ND_GENERATION_URL = 'https://forms.gle/AKf164VXtJPGJRoo8';
export const MEMBER_REQUEST_FORM_URL = 'https://forms.gle/Hs9tJgMG9bNvT1rS9';

export const playgroundLink = {
  memberList: () => `/members`,
  memberDetail: (id: string | number) => `/members?id=${id}`,
  memberUpload: () => `/members/upload`,
  memberEdit: () => `/members/upload?edit=true`,
  projectList: () => `/projects`,
  projectDetail: (id: string | number) => `/projects?id=${id}`,
  projectUpload: () => `/projects/upload`,
  projectEdit: (id: string | number) => `/projects/upload?id=${id}&edit=true`,
  groupList: () => '/group',
  login: () => `/auth/login`,
  register: () => `/auth/verify`,
  makers: () => `/makers`,
};
