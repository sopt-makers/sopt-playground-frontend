const CrewQueryKey = {
  all: ['crew'] as const,
  post: (postId: number) => [...CrewQueryKey.all, 'post', postId] as const,
};

export default CrewQueryKey;
