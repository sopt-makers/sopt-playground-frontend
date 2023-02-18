// /projects/[id] 주소로 직접 접근 시 /projects/[id].html 로 보내기
export const onRequest: PagesFunction = async (context) => {
  const { next } = context;

  return next('/projects/[id]');
};
