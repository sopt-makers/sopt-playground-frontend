import { FC, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import AuthRequired from '@/components/auth/AuthRequired';
import AskFormPage from '@/components/members/ask/AskFormPage';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';
import { usePutMemberQuestion } from '@/api/endpoint/members/putMemberQuestion'; // ✅ 경로 맞춰줘

type AskDraft = { content: string; isAnonymous: boolean };

const AskEditPage: FC = () => {
  const router = useRouter();
  const { status, query } = useStringRouterQuery(['id'] as const);

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
    await putQuestion({ questionId: questionIdNum, content });

    sessionStorage.removeItem(storageKey);
    router.back();
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
