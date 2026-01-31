import { FC, useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import AuthRequired from '@/components/auth/AuthRequired';
import AskFormPage from '@/components/members/ask/AskFormPage';
import type { MemberQuestion } from '@/api/endpoint/members/getMemberQuestions';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { getRelativeTime } from '@/components/feed/common/utils';
import { setLayout } from '@/utils/layout';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import ResizedImage from '@/components/common/ResizedImage';
import { IconMember } from '@/components/feed/common/Icon';
import Link from 'next/link';
import { playgroundLink } from '@/constants/links';
import { usePutMemberAnswer } from '@/api/endpoint/members/putMemberAnswer';
import { useDialog, useToast } from '@sopt-makers/ui';

const STORAGE_PREFIX = 'ask-answer-edit-';

const AskAnswerEditPage: FC = () => {
  const router = useRouter();
  const { status, query } = useStringRouterQuery(['id'] as const);

  const { open: openDialog, close: closeDialog } = useDialog();
  const { open: openToast } = useToast();

  const [question, setQuestion] = useState<MemberQuestion | null>(null);

  const answerId = useMemo(() => {
    const id = query?.id;
    if (!id) return null;
    const num = Number(id);
    return Number.isNaN(num) ? null : num;
  }, [query?.id]);

  const storageKey = useMemo(() => (answerId ? `${STORAGE_PREFIX}${answerId}` : ''), [answerId]);

  const { mutateAsync: putAnswer, isPending } = usePutMemberAnswer();

  useEffect(() => {
    if (status !== 'success' || !storageKey) return;

    const stored = sessionStorage.getItem(storageKey);
    if (!stored) return;

    try {
      const parsed: MemberQuestion = JSON.parse(stored);
      setQuestion(parsed);
    } catch {
      // ignore
    }
  }, [status, storageKey]);

  useEffect(() => {
    if (!storageKey) return;

    const handleRouteChangeStart = () => {
      sessionStorage.removeItem(storageKey);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router.events, storageKey]);

if (status === 'loading') return null;
if (!answerId || !question || !question.answer) return null;

const runUpdate = async (content: string) => {
  try {
    await putAnswer({ answerId, content });
    sessionStorage.removeItem(storageKey);

    openToast({
      icon: 'success',
      content: '답변이 수정되었어요.',
      style: { content: { whiteSpace: 'pre-wrap' } },
    });

    closeDialog();
    router.back();
  } catch {
    openToast({
      icon: 'error',
      content: '수정에 실패했어요. 잠시 후 다시 시도해 주세요.',
      style: { content: { whiteSpace: 'pre-wrap' } },
    });

    closeDialog();
  }
};

const handleSubmit = async ({ content }: { content: string; isAnonymous: boolean }) => {
  openDialog({
    title: '답변을 수정하시겠어요?',
    description: '수정된 답변으로 변경됩니다.',
    type: 'default',
    typeOptions: {
      cancelButtonText: '취소',
      approveButtonText: isPending ? '처리중...' : '수정하기',
      buttonFunction: async () => {
        if (isPending) return;
        await runUpdate(content);
      },
    },
  });
};

  const askerName = question.isAnonymous
    ? question.anonymousProfile?.nickname ?? '익명'
    : question.askerName ?? '익명';

  return (
    <AuthRequired>
      <AskFormPage
        isEdit
        onSubmit={handleSubmit}
        defaultValues={{
          content: question.answer.content,
          isAnonymous: false,
        }}
        isSubmitting={isPending}
        hideAnonymousToggle={true}
        commentSlot={
          <QuestionPreview>
            <QuestionHeader>
              {question.isAnonymous ? (
                <ProfileImageBox>
                  {question.anonymousProfile ? (
                    <ProfileImage
                      width={32}
                      height={32}
                      src={question.anonymousProfile?.profileImgUrl}
                      alt='anonymousProfileImage'
                    />
                  ) : (
                    <IconMember size={32} />
                  )}
                </ProfileImageBox>
              ) : (
                <Link href={playgroundLink.memberDetail(question.askerId as number)} css={{ height: 'fit-content' }}>
                  <ProfileImageBox>
                    {question.askerProfileImage ? (
                      <ProfileImage width={32} height={32} src={question.askerProfileImage} alt='profileImage' />
                    ) : (
                      <IconMember size={32} />
                    )}
                  </ProfileImageBox>
                </Link>
              )}

              <HeaderText>
                <NameRow>
                  <Name>{askerName}</Name>
                  <Meta>{!question.isAnonymous && <>{question.askerLatestGeneration}∙</>}{getRelativeTime(question.createdAt)}</Meta>
                </NameRow>
              </HeaderText>
            </QuestionHeader>

            <QuestionBody>{question.content}</QuestionBody>

            <Divider />
          </QuestionPreview>
        }
      />
    </AuthRequired>
  );
};

setLayout(AskAnswerEditPage, 'empty');
export default AskAnswerEditPage;

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

const Name = styled.div`
  ${fonts.HEADING_24_B}

  white-space: nowrap;
  color: ${colors.white};
`;

const Meta = styled.div`
  ${fonts.BODY_16_M}

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.gray400};
`;

const QuestionBody = styled.p`
  margin: 0;
  ${fonts.HEADING_24_B}

  line-height: 1.4;
  color: ${colors.gray50};
`;

const Divider = styled.hr`
  margin: 6px 0 2px;
  border: 0;
  background: ${colors.gray800};
  height: 1px;
`;

