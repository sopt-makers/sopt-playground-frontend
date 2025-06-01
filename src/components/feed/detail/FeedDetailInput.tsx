import { playgroundLink } from 'playground-common/export';
import { FC } from 'react';
import { atomFamily, useRecoilState } from 'recoil';

import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { usePostCommentMutation } from '@/api/endpoint/feed/postComment';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { useFeedReferral } from '@/components/feed/common/hooks/useFeedReferral';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';
import { PLAYGROUND_ORIGIN } from '@/constants/links';

interface FeedDetailInputProps {
  postId: string;
  onSubmitted: () => void;
  category: string;
  tag: string;
  hasChildren: boolean;
}

const commentAtomFamily = atomFamily({
  key: 'commentAtomFamily',
  default: () => ({ text: '', isBlindWriter: false }),
});

const FeedDetailInput: FC<FeedDetailInputProps> = ({ postId, onSubmitted, category, tag, hasChildren }) => {
  const [commentData, setCommentData] = useRecoilState(commentAtomFamily(postId));
  const { refetch: refetchCommentQuery } = useGetCommentQuery(postId);
  const { mutate: postComment, isPending } = usePostCommentMutation(postId);
  const { logSubmitEvent } = useEventLogger();
  const { referral } = useFeedReferral();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmptyText = commentData.text.trim() === '';
    if (isEmptyText) {
      return;
    }
    postComment(
      {
        content: commentData.text,
        isBlindWriter: commentData.isBlindWriter,
        isChildComment: false,
        webLink: `${PLAYGROUND_ORIGIN}${playgroundLink.feedDetail(postId)}`,
      },
      {
        onSuccess: async () => {
          setCommentData((prev) => ({ ...prev, text: '' }));

          const { isSuccess } = await refetchCommentQuery();
          if (isSuccess) {
            const loggingCategory = hasChildren ? `${category}_${tag}` : `${category}`;
            logSubmitEvent('postComment', {
              feedId: postId,
              referral,
              isBlindWriter: commentData.isBlindWriter,
              category: loggingCategory,
            });
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
        isPending={isPending}
      />
    </form>
  );
};

export default FeedDetailInput;
