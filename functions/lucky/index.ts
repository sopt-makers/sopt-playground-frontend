// /lucky 주소로 직접 접근 시 /lucky.html 로 보내기
export const onRequest = async (context) => {
  const { next } = context;

  return next('/lucky');
};
