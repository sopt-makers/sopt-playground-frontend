import { useToggleQuestionReactionMutation } from '@/api/endpoint/members/postQuestionReaction';

interface HandleToggleLikeAskAnswerParams {
  answerId: number;
  isReacted: boolean;
  reactionCount: number;
  questionQueryKeys: unknown[][];
}

export const useToggleLikeAskAnswer = () => {
  const { mutate } = useToggleQuestionReactionMutation();

  const handleToggleLikeAskAnswer = async ({
    answerId,
    isReacted,
    reactionCount,
    questionQueryKeys,
  }: HandleToggleLikeAskAnswerParams) => {
    const mutationParams = {
      answerId,
      isReacted,
      reactionCount,
      questionQueryKeys,
    };
    mutate(mutationParams);
  };

  return { handleToggleLikeAskAnswer };
};
