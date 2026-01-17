import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import AskFormPage from '@/components/members/ask/AskFormPage';
import { usePostMemberAsk } from '@/api/endpoint/members/postMemberQuestion';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';
import { useDialog } from '@sopt-makers/ui';

const MemberAskUploadPage: FC = () => {
  const { status, query } = useStringRouterQuery(['memberId'] as const);
  const router = useRouter();
  const { open } = useDialog();
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

    open({
      title: '답변이 달리면 질문을 수정 혹은 삭제할 수 없어요.',
      description: '답변자와 다른 이용자를 위해, 내용 변경은 제한하고 있어요.',
      type: 'default',
      typeOptions: {
        cancelButtonText: '돌아가기',
        approveButtonText: '등록하기',

        buttonFunction: async () => {
          try {
            await createQuestion({
              receiverId,
              content,
              isAnonymous,
              latestSoptActivity,
            });

            open({
              title: '알림이 켜져 있는지 확인해 주세요.',
              description: '답변이 달리면 푸시 알림으로 알려드려요.',
              type: 'single',
              typeOptions: {
                approveButtonText: '확인했어요',
                buttonFunction: () => {
                  router.push(`/members/${receiverId}?tab=ask&questionTab=unanswered`);
                },
              },
            });
          } catch (e) {
            open({
              title: '등록에 실패했어요.',
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
