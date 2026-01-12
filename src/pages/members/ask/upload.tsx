import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import AskFormPage from '@/components/members/ask/AskFormPage';
import { usePostMemberAsk } from '@/api/endpoint/members/postMemberQuestion';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const MemberAskUploadPage: FC = () => {
  const { status, query } = useStringRouterQuery(['memberId'] as const);
  const router = useRouter();

  const { mutateAsync: createQuestion, isPending } = usePostMemberAsk();

  const receiverId = useMemo(() => {
    const raw = query?.memberId;
    if (!raw) return null;
    const n = Number(raw);
    return Number.isNaN(n) ? null : n;
  }, [query?.memberId]);

  if (status === 'loading') return null;
  if (receiverId == null) return null;

  const handleSubmit = async ({ content, isAnonymous }: { content: string; isAnonymous: boolean }) => {
    const latestSoptActivity = '';

    await createQuestion({
      receiverId,
      content,
      isAnonymous,
      latestSoptActivity,
    });

    router.back();
  };

  return (
    <AuthRequired>
      <AskFormPage
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        defaultValues={{
          content: '',
          isAnonymous: true,
        }}
      />
    </AuthRequired>
  );
};

setLayout(MemberAskUploadPage, 'empty');
export default MemberAskUploadPage;
