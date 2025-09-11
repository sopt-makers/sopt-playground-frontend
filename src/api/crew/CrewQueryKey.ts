const CrewQueryKey = {
  all: ['crew'] as const,
  post: (orgId: number) => [...CrewQueryKey.all, 'post', orgId] as const,
};

export default CrewQueryKey;
