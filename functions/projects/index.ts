// 리다이렉트: /projects?id=123 -> /projects/123
export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (id) {
    return Response.redirect(url.origin + `/projects/${id}`, 301);
  }

  return next();
};
