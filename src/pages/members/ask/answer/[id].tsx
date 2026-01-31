import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useToast } from '@sopt-makers/ui';
import Link from 'next/link';
import { FC, useEffect, useMemo, useState } from 'react';

import type { MemberQuestion } from '@/api/endpoint/members/getMemberQuestions';
import { usePostMemberQuestionAnswer } from '@/api/endpoint/members/postMemberAnswer';
import AuthRequired from '@/components/auth/AuthRequired';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { IconMember } from '@/components/feed/common/Icon';
import { getRelativeTime } from '@/components/feed/common/utils';
import AskFormPage from '@/components/members/ask/AskFormPage';
import { playgroundLink } from '@/constants/links';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const STORAGE_PREFIX = 'ask-answer-';

const AskAnswerPage: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);
  const [question, setQuestion] = useState<MemberQuestion | null>(null);
  const { open } = useToast();
  const { logSubmitEvent } = useEventLogger();
  const questionId = useMemo(() => query?.id ?? '', [query?.id]);

  const questionIdNum = useMemo(() => {
    const n = Number(questionId);
    return Number.isNaN(n) ? null : n;
  }, [questionId]);

  const { mutateAsync: postAnswer, isPending } = usePostMemberQuestionAnswer();

  useEffect(() => {
    if (status !== 'success' || !questionId) return;

    const stored = sessionStorage.getItem(`${STORAGE_PREFIX}${questionId}`);
    if (!stored) return;

    try {
      const parsed: MemberQuestion = JSON.parse(stored);
      setQuestion(parsed);
    } catch {
      // ignore
    }
  }, [status, questionId]);

  if (status === 'loading') return null;
  if (!questionId || questionIdNum == null || !question) return null;

  const handleSubmit = async ({ content }: { content: string; isAnonymous: boolean }) => {
    await postAnswer({
      questionId: questionIdNum,
      content,
    });

    logSubmitEvent('submitAnswer', { feedId: questionIdNum });

    open({
      icon: 'success',
      content: '답변이 등록되었어요.',
      style: {
        content: {
          whiteSpace: 'pre-wrap',
        },
      },
    });

    sessionStorage.removeItem(`${STORAGE_PREFIX}${questionId}`);

    window.history.back();
  };

  const askerName = question.isAnonymous ? question.anonymousProfile?.nickname ?? '익명' : question.askerName ?? '익명';

  return (
    <AuthRequired>
      <AskFormPage
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        defaultValues={{
          content: '',
          isAnonymous: false,
        }}
        hideAnonymousToggle={true}
        commentSlot={
          <QuestionPreview>
            <QuestionHeader>
              {question.isAnonymous ? (
                <ProfileImageBox>
                  {question.anonymousProfile ? (
                    <ProfileImage
                      width={24}
                      height={24}
                      src={question.anonymousProfile?.profileImgUrl}
                      alt='anonymousProfileImage'
                    />
                  ) : (
                    <IconMember size={24} />
                  )}
                </ProfileImageBox>
              ) : (
                <Link href={playgroundLink.memberDetail(question.askerId as number)} css={{ height: 'fit-content' }}>
                  <ProfileImageBox>
                    {question.askerProfileImage ? (
                      <ProfileImage width={24} height={24} src={question.askerProfileImage} alt='profileImage' />
                    ) : (
                      <IconMember size={24} />
                    )}
                  </ProfileImageBox>
                </Link>
              )}

              <HeaderText>
                <NameRow>
                  <Text typography='SUIT_14_SB'>{askerName}</Text>
                  <Text typography='SUIT_12_SB' color={colors.gray400}>
                    {!question.isAnonymous && <>{question.askerLatestGeneration}∙</>}{getRelativeTime(question.createdAt)}
                  </Text>
                </NameRow>
              </HeaderText>
            </QuestionHeader>

            <Text typography='SUIT_14_R' color={colors.gray100}>
              {question.content}
            </Text>

            <Divider />
          </QuestionPreview>
        }
      />
    </AuthRequired>
  );
};

setLayout(AskAnswerPage, 'empty');
export default AskAnswerPage;

const QuestionPreview = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const QuestionHeader = styled.header`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const ProfileImageBox = styled.div`
  flex-shrink: 0;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  object-fit: cover;
`;

const ProfileImage = styled(ResizedImage)`
  flex-shrink: 0;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NameRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: baseline;
  min-width: 0;
`;

const Divider = styled.hr`
  margin: 6px 0 2px;
  border: 0;
  background: ${colors.gray800};
  height: 1px;
`;
