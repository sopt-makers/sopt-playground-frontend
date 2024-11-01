// functions/coffeechat.ts
export const onRequest = async (context) => {
  const { next } = context;

  // /coffeechat 접근 시 /coffeechat/index.html로 전달
  return next('/coffeechat/index.html');
};
