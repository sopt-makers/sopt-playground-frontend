import { number, object } from 'yup';

const ACCESS_TOKEN_KEY = 'serviceAccessToken';

export const tokenStorage = {
  get() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  set(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },
  remove() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};

export function safeDecodeAccessToken(token: string) {
  try {
    const encodedSegment = token.split('.')[1];
    const segment = JSON.parse(window.atob(encodedSegment)) as unknown;

    const jwtHeader = hasExp.validateSync(segment);

    const exp = jwtHeader.exp;

    if (exp < Date.now() / 1000) {
      return null;
    }

    return segment;
  } catch (e) {
    console.log(e);
    return null;
  }
}

const hasExp = object({
  exp: number().required(),
});
