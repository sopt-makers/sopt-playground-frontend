import { colors } from '@sopt-makers/colors';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';

import { useDeletePostMutation } from '@/api/endpoint/feed/deletePost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import useConfirm from '@/components/common/Modal/useConfirm';
import useToast from '@/components/common/Toast/useToast';
import { useCategoryParam } from '@/components/feed/common/queryParam';
import { zIndex } from '@/styles/zIndex';

interface Options {
  postId: string;
  onSuccess?: () => void;
}

export const useDeleteFeed = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate } = useDeletePostMutation();
  const { confirm } = useConfirm();
  const router = useRouter();
  const [categoryId] = useCategoryParam();

  const handleDeleteFeed = async (options: Options) => {
    const result = await confirm({
      title: '글을 정말 삭제하시겠어요?',
      description: '유익한 정보를 담고 있다면, 글을 남겨 다른 사람들과도 공유해보세요.',
      okButtonColor: colors.error,
      okButtonTextColor: colors.white,
      okButtonText: '삭제하기',
      cancelButtonText: '취소',
      maxWidth: 324,
      zIndex: zIndex.헤더,
    });

    if (result) {
      mutate(options.postId, {
        onSuccess: () => {
          options.onSuccess?.();
          toast.show({
            message: '글이 성공적으로 삭제되었어요.',
          });
          router.push(playgroundLink.feedList());
          queryClient.invalidateQueries({
            queryKey: useGetPostsInfiniteQuery.getKey(categoryId),
          });
        },
      });
    }
  };

  return { handleDeleteFeed };
};
