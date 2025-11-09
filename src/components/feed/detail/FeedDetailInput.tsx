import { playgroundLink } from 'playground-common/export';
import { FC, useContext } from 'react';
import { atomFamily, useRecoilState } from 'recoil';

import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { usePostCommentMutation } from '@/api/endpoint/feed/postComment';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { useFeedReferral } from '@/components/feed/common/hooks/useFeedReferral';
import { mentionRegex } from '@/components/feed/common/utils/parseMention';
import { extractAnonymousMentionNames } from '@/components/feed/common/utils/parseMention';
import { ANONYMOUS_MEMBER_ID } from '@/components/feed/constants';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';
import { ReplyContext } from '@/components/feed/detail/FeedDetail';
import { PLAYGROUND_ORIGIN } from '@/constants/links';
interface FeedDetailInputProps {
  postId: string;
  onSubmitted: () => void;
  category: string;
  tag: string;
  hasChildren: boolean;
}

export const commentAtomFamily = atomFamily({
  key: 'commentAtomFamily',
  default: () => ({ text: '', isBlindWriter: false }),
});
export const anonymouseMentionRegex = /@([^\[\]@]+?)\[((?:-1))\]/g;

const FeedDetailInput: FC<FeedDetailInputProps> = ({ postId, onSubmitted, category, tag, hasChildren }) => {
  const { member, parentCommentId, setReplyState } = useContext(ReplyContext);
  const [commentData, setCommentData] = useRecoilState(commentAtomFamily(postId));
  const { refetch: refetchCommentQuery } = useGetCommentQuery(postId);
  const { mutate: postComment, isPending } = usePostCommentMutation(postId);
  const { logSubmitEvent } = useEventLogger();
  const { referral } = useFeedReferral();
  const { data: me } = useGetMemberOfMe();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmptyText = commentData.text.trim() === '';
    if (isEmptyText) {
      return;
    }

    // mention id 저장
    const mentionIds: number[] = [];
    let match: RegExpExecArray | null;

    while ((match = mentionRegex.exec(commentData.text)) !== null) {
      const idNum = parseInt(match[2], 10);
      if (!isNaN(idNum)) {
        mentionIds.push(idNum);
      }
    }
    const anonymousNicknames = extractAnonymousMentionNames(commentData.text);
    postComment(
      {
        content: commentData.text,
        isBlindWriter: commentData.isBlindWriter,
        isChildComment: parentCommentId !== null,
        parentCommentId: parentCommentId ?? undefined,
        webLink: `${PLAYGROUND_ORIGIN}${playgroundLink.feedDetail(postId)}`,
        mention:
          mentionIds.length > 0
            ? {
                userIds: mentionIds.filter((id) => id !== ANONYMOUS_MEMBER_ID),
                writerName: me?.name,
                webLink: `${PLAYGROUND_ORIGIN}${playgroundLink.feedDetail(postId)}`,
              }
            : null,
        // TODO: 댓글에서 @입력 시 게시글에 댓글을 단 익명 멤버 멘션할 수 있는 기능 구현 후 (현재는 답글 멘션만 가능)
        anonymousMention: {
          anonymousNickname: anonymousNicknames,
        },
      },
      {
        onSuccess: async () => {
          setCommentData((prev) => ({ ...prev, text: '' }));
          setReplyState({ member: null, replyTargetCommentId: null, parentCommentId: null });
          const { isSuccess } = await refetchCommentQuery();
          if (isSuccess) {
            const loggingCategory = hasChildren ? `${category}_${tag}` : `${category}`;
            logSubmitEvent('postComment', {
              feedId: postId,
              referral,
              isBlindWriter: commentData.isBlindWriter,
              category: loggingCategory,
              mention: /@([^\[\]\s@]+)\[(\d+)\]/.test(commentData.text),
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
