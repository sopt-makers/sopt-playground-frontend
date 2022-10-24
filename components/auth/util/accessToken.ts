import { number, object, string } from 'yup';

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
    const matches = token.match(/^(.+)\.(.+)\.(.+)$/);
    if (!matches) {
      return null;
    }

    const jwtHeader = JSON.parse(window.atob(matches[1])) as unknown;
    const jwtPayload = JSON.parse(window.atob(matches[2])) as unknown;

    const header = validateHeader.validateSync(jwtHeader);
    const payload = validatePayload.validateSync(jwtPayload);

    const exp = payload.exp;

    if (exp < Date.now() / 1000) {
      return null;
    }

    return { header, payload };
  } catch {
    return null;
  }
}

const validatePayload = object({
  exp: number().required(),
});

const validateHeader = object({
  alg: string(),
  typ: string().oneOf(['JWT']),
});
