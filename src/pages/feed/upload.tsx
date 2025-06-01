import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FC } from 'react';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { uploadFeed } from '@/api/endpoint/feed/uploadFeed';
import AuthRequired from '@/components/auth/AuthRequired';
import Loading from '@/components/common/Loading';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { categoryIdNameMap } from '@/components/feed/common/utils';
import FeedUploadPage, { LoadingWrapper } from '@/components/feed/page/FeedUploadPage';
import { PostedFeedDataType } from '@/components/feed/upload/types';
import { setLayout } from '@/utils/layout';
import { getCategory } from '@/api/endpoint/feed/getCategory';

const FeedUpload: FC = () => {
  const router = useRouter();
  const { logSubmitEvent } = useEventLogger();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (reqeustBody: { data: PostedFeedDataType; id: number | null }) =>
      uploadFeed.request({ ...reqeustBody.data }),
  });

  type Category = {
    id: number;
    name: string;
    children: Category[];
  };

  const { data: categoryData } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  const getFullCategoryNameFromId = (id: number): string | undefined => {
    if (categoryData) {
      for (const parent of categoryData) {
        if (parent.id === id) return parent.name;

        const child = parent.children.find((c) => c.id === id);
        if (child) {
          return `${parent.name}_${child.name}`;
        }
      }

      return undefined;
    }
  };

  const handlUploadSubmit = ({ data, id }: { data: PostedFeedDataType; id: number | null }) => {
    mutate(
      { data: data, id: id },
      {
        onSuccess: async () => {
          const category = data.categoryId !== null ? getFullCategoryNameFromId(data.categoryId) : undefined;
          logSubmitEvent('submitCommunity', { category });
          queryClient.invalidateQueries({ queryKey: useGetPostsInfiniteQuery.getKey('') });
          await router.push(playgroundLink.feedList());
        },
      },
    );
  };

  if (isPending) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  return (
    <AuthRequired>
      <FeedUploadPage
        defaultValue={{
          categoryId: null,
          title: '',
          content: '',
          isQuestion: false,
          isBlindWriter: false,
          images: [],
          link: null,
        }}
        onSubmit={handlUploadSubmit}
      />
    </AuthRequired>
  );
};

setLayout(FeedUpload, 'empty');

export default FeedUpload;
