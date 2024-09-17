import { colors } from '@sopt-makers/colors';
import { useToast } from '@sopt-makers/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';

import { usePostBlockMemberMutation } from '@/api/endpoint/members/postBlockMember';
import useConfirm from '@/components/common/Modal/useConfirm';

export const useBlockMember = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { confirm } = useConfirm();
  const { open } = useToast();
  const { mutate } = usePostBlockMemberMutation();

  const handleBlockMember = async (memberId?: number) => {
    if (!memberId) throw new Error('Invalid Member id');

    const result = await confirm({
      title: '이 멤버를 차단하시겠습니까?',
      description:
        '차단 시 멤버 리스트는 유지되지만, 이 멤버의 게시글과 댓글이 보이지 않게 돼요. 한 번 차단한 멤버는 다시 해제할 수 없어요.',
      okButtonText: '차단하기',
      okButtonColor: colors.error,
      okButtonTextColor: colors.white,
      cancelButtonText: '취소',
      maxWidth: 400,
    });

    if (result) {
      mutate(
        { blockedMemberId: memberId },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries();
            await router.push(playgroundLink.memberList());

            open({
              icon: 'success',
              content: '멤버가 차단되었어요.',
            });
          },
        },
      );
    }
  };

  return { handleBlockMember };
};
