// 리다이렉트: /members/detail?id=123 -> /members/123
export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (id) {
    return Response.redirect(url.origin + `/members/${id}`, 301);
  }

  return next();
};
