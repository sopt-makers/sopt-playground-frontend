import { FC } from 'react';
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
  default: () => ({ text: '', isBlindWriter: false }),
});

const FeedDetailInput: FC<FeedDetailInputProps> = ({ postId, onSubmitted }) => {
  const [commentData, setCommentData] = useRecoilState(commentAtomFamily(postId));
  const { refetch: refetchCommentQuery } = useGetCommentQuery(postId);
  const { mutate: postComment } = usePostCommentMutation(postId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postComment(
      {
        content: commentData.text,
        isBlindWriter: commentData.isBlindWriter,
        isChildComment: false,
      },
      {
        onSuccess: async () => {
          setCommentData((prev) => ({ ...prev, text: '' }));

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
        value={commentData.text}
        onChange={(newValue) => setCommentData((prev) => ({ ...prev, text: newValue }))}
        isBlindChecked={commentData.isBlindWriter}
        onChangeIsBlindChecked={(newValue) => setCommentData((prev) => ({ ...prev, isBlindWriter: newValue }))}
      />
    </form>
  );
};

export default FeedDetailInput;
