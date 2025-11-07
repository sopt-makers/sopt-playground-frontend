export const IS_DEV = process.env.NODE_ENV === 'development';

export const DEBUG = process.env.NEXT_PUBLIC_DEBUG?.toLowerCase() === 'true';
export const API_URL = required('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);
export const AUTH_API_URL = required('NEXT_PUBLIC_AUTH_API_URL', process.env.NEXT_PUBLIC_AUTH_API_URL);
export const CREW_API_URL = required('NEXT_PUBLIC_CREW_API_URL', process.env.NEXT_PUBLIC_CREW_API_URL);
export const ORIGIN = required('NEXT_PUBLIC_ORIGIN', process.env.NEXT_PUBLIC_ORIGIN);
export const FACEBOOK_APP_ID = required('NEXT_PUBLIC_FACEBOOK_APP_ID', process.env.NEXT_PUBLIC_FACEBOOK_APP_ID);
export const GOOGLE_OAUTH_CLIENT_ID = required(
  'NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID',
  process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
);
export const APPLE_OAUTH_APP_ID = required(
  'NEXT_PUBLIC_APPLE_OAUTH_APP_ID',
  process.env.NEXT_PUBLIC_APPLE_OAUTH_APP_ID,
);
export const GTM_ID = required('NEXT_PUBLIC_GTM_ID', process.env.NEXT_PUBLIC_GTM_ID);
export const AMPLITUDE_API_KEY = required('AMPLITUDE_API_KEY', process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY);
export const CHANNEL_TALK_PLUGIN_KEY = required(
  'NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY',
  process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY,
);
export const ADMIN_API_URL = required('NEXT_PUBLIC_ADMIN_API_URL', process.env.NEXT_PUBLIC_ADMIN_API_URL);
export const ADMIN_API_KEY = required('NEXT_PUBLIC_ADMIN_API_KEY', process.env.NEXT_PUBLIC_ADMIN_API_KEY);
export const OPERATION_API_URL = required('NEXT_PUBLIC_OPERATION_API_URL', process.env.NEXT_PUBLIC_OPERATION_API_URL);

function required(key: string, value: string | undefined): string {
  if (value === undefined) {
    throw new Error(`환경변수 ${key} 가 설정되지 않았습니다.`);
  }
  return value;
}
