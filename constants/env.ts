export const DEBUG = process.env.NEXT_PUBLIC_DEBUG?.toLowerCase() === 'true';
export const API_URL = required('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);
export const ORIGIN = required('NEXT_PUBLIC_ORIGIN', process.env.NEXT_PUBLIC_ORIGIN);
export const FACEBOOK_APP_ID = required('NEXT_PUBLIC_FACEBOOK_APP_ID', process.env.NEXT_PUBLIC_FACEBOOK_APP_ID);
export const GOOGLE_OAUTH_CLIENT_ID = required(
  'NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID',
  process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
);
export const GTM_ID = required('NEXT_PUBLIC_GTM_ID', process.env.NEXT_PUBLIC_GTM_ID);

function required(key: string, value: string | undefined): string {
  if (value === undefined) {
    throw new Error(`환경변수 ${key} 가 설정되지 않았습니다.`);
  }
  return value;
}
