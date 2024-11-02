// /coffeechat/[id] 주소로 직접 접근 시 /coffeechat/[id].html 로 보내기
export const onRequest = async (context) => {
  const { next, params } = context;

  if (/\d+/.test(`${params.id}`)) {
    return next('/coffeechat/[id]');
  }

  return next();
};
