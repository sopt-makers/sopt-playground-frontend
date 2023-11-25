import { FC, useState } from 'react';
import { atomFamily, useRecoilState } from 'recoil';

import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { usePostCommentMutation } from '@/api/endpoint/feed/postComment';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';

interface FeedDetailInputProps {
  postId: string;
  onSubmitted: () => void;
}

const commentAtomFamily = atomFamily({
  key: 'commentAtomFamily',
  default: '',
});

const FeedDetailInput: FC<FeedDetailInputProps> = ({ postId, onSubmitted }) => {
  const [value, setValue] = useRecoilState(commentAtomFamily(postId));
  const [isBlindWriter, setIsBlindWriter] = useState<boolean>(false);
  const { refetch: refetchCommentQuery } = useGetCommentQuery(postId);
  const { mutate: postComment } = usePostCommentMutation(postId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postComment(
      {
        content: value,
        isBlindWriter,
        isChildComment: false,
      },
      {
        onSuccess: async () => {
          setValue('');
          const { isSuccess } = await refetchCommentQuery();
          if (isSuccess) {
            onSubmitted();
          }
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <DetailFeedCard.Input
        value={value}
        onChange={setValue}
        isBlindChecked={isBlindWriter}
        onChangeIsBlindChecked={setIsBlindWriter}
      />
    </form>
  );
};

export default FeedDetailInput;
