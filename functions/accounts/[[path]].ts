export const onRequest: PagesFunction<{ ACCOUNTS_DOMAIN: string }> = async (context) => {
  const { request, env } = context;

  const newURL = new URL(request.url);
  newURL.hostname = env.ACCOUNTS_DOMAIN;
  newURL.pathname = newURL.pathname.replace(/^\/accounts/, '') || '/';

  return fetch(newURL.href, request);
};
