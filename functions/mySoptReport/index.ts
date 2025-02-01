// /mySoptReport 주소로 직접 접근 시 /mySoptReport.html 로 보내기
export const onRequest = async (context) => {
  const { next } = context;

  return next('/mySoptReport');
};
