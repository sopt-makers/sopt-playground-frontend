// /coffeechat/edit/[id] 주소로 직접 접근 시 /coffeechat/edit/[id].html 로 보내기
export const onRequest = async (context) => {
  const { next, params } = context;

  if (/\d+/.test(`${params.id}`)) {
    return next('/coffeechat/edit/[id]');
  }

  return next();
};
