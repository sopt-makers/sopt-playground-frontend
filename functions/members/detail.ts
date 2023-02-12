export const onRequest: PagesFunction = async (context) => {
  const { request } = context;

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (id) {
    const newUrl = new URL(request.url);
    newUrl.pathname = '/member';
    newUrl.searchParams.set('id', id);
    return Response.redirect(newUrl.toString(), 301);
  }

  return fetch(request);
};
