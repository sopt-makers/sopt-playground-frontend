// /coffeechat 주소로 직접 접근 시 /coffeechat.html 로 보내기
export const onRequest = async (context) => {
  const { next } = context;

  return next('/coffeechat');
};
