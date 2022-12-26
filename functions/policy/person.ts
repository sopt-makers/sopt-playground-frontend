const PERSON_POLICY_HREF = 'https://parangjy.notion.site/5ade645578b44a2ab7bbb04d478d24b4';

export const onRequest: PagesFunction = async (context) => {
  const { request } = context;

  return fetch(PERSON_POLICY_HREF, request);
};
