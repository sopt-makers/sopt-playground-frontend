export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (id) {
    const newUrl = new URL(request.url);
    newUrl.pathname = '/project';
    newUrl.searchParams.set('id', id);
    return Response.redirect(newUrl.toString(), 301);
  }

  return next();
};
