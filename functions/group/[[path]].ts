const CREW_DOMAIN = 'sopt-crew-dev.pages.dev';

export const onRequest: PagesFunction = async (context) => {
  const { request } = context;

  const newURL = new URL(request.url);
  newURL.hostname = CREW_DOMAIN;
  return fetch(newURL.href, request);
};
