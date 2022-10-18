export const isLocal = !!process.env.NEXT_PUBLIC_LOCAL;
export const DEBUG = process.env.NEXT_PUBLIC_DEBUG?.toLowerCase() === 'true';
