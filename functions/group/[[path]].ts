export const onRequest: PagesFunction<{ CREW_DOMAIN: string }> = async (context) => {
  const { request, env } = context;

  const newURL = new URL(request.url);
  newURL.hostname = env.CREW_DOMAIN;
  return fetch(newURL.href, request);
};
