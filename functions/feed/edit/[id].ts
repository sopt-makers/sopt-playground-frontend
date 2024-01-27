// /feed/edit/[id] 주소로 직접 접근 시 /feed/edit/[id].html 로 보내기
export const onRequest: PagesFunction = async (context) => {
  const { next, params } = context;

  if (/\d+/.test(`${params.id}`)) {
    return next('/feed/edit/[id]');
  }

  return next();
};
