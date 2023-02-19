// /members/[id] 주소로 직접 접근 시 /members/[id].html 로 보내기
export const onRequest: PagesFunction = async (context) => {
  const { next, params } = context;

  if (/\d+/.test(`${params.id}`)) {
    return next('/members/[id]');
  }

  return next();
};
