import { FC, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import AuthRequired from '@/components/auth/AuthRequired';
import AskFormPage from '@/components/members/ask/AskFormPage';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';
import { usePutMemberQuestion } from '@/api/endpoint/members/putMemberQuestion';
import { useDialog } from '@sopt-makers/ui';

type AskDraft = { content: string; isAnonymous: boolean };

const AskEditPage: FC = () => {
  const router = useRouter();
  const { status, query } = useStringRouterQuery(['id'] as const);
  const { open } = useDialog();

  const questionId = useMemo(() => query?.id ?? '', [query?.id]);
  const questionIdNum = useMemo(() => {
    const n = Number(questionId);
    return Number.isNaN(n) ? null : n;
  }, [questionId]);

  const storageKey = useMemo(() => (questionId ? `ask-edit-${questionId}` : ''), [questionId]);

  const [defaultValues, setDefaultValues] = useState<AskDraft | null>(null);

  const { mutateAsync: putQuestion, isPending } = usePutMemberQuestion();

  useEffect(() => {
    if (status !== 'success' || !storageKey) return;

    const stored = sessionStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDefaultValues({
          content: parsed.content ?? '',
          isAnonymous: parsed.isAnonymous ?? true,
        });
        return;
      } catch {
        // ignore
      }
    }
    setDefaultValues({ content: '', isAnonymous: true });
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

  if (status === 'loading' || defaultValues === null) return null;
  if (!questionId || questionIdNum == null) return null;

  const handleSubmit = async ({ content }: AskDraft) => {
    open({
      title: '답변이 달리면 질문을 수정 혹은 삭제할 수 없어요.',
      description: '답변자와 다른 이용자를 위해, 내용 변경은 제한하고 있어요.',
      type: 'default',
      typeOptions: {
        cancelButtonText: '돌아가기',
        approveButtonText: '수정하기',
        buttonFunction: async () => {
          try {
            await putQuestion({ questionId: questionIdNum, content });

            sessionStorage.removeItem(storageKey);

            open({
              title: '알림이 켜져 있는지 확인해 주세요.',
              description: '답변이 달리면 푸시 알림으로 알려드려요.',
              type: 'single',
              typeOptions: {
                approveButtonText: '확인했어요',
                buttonFunction: () => {
                  router.back();
                },
              },
            });
          } catch {
            open({
              title: '수정에 실패했어요.',
              description: '잠시 후 다시 시도해 주세요.',
              type: 'single',
              typeOptions: {
                approveButtonText: '확인',
                buttonFunction: () => {},
              },
            });
          }
        },
      },
    });
  };

  return (
    <AuthRequired>
      <AskFormPage
        isEdit
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        isSubmitting={isPending}
        commentSlot={null}
      />
    </AuthRequired>
  );
};

setLayout(AskEditPage, 'empty');
export default AskEditPage;
