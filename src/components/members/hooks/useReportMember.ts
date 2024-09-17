import { useToast } from '@sopt-makers/ui';

import { usePostReportMemberMutation } from '@/api/endpoint/members/postReportMember';
import useConfirm from '@/components/common/Modal/useConfirm';

export const useReportMember = () => {
  const { confirm } = useConfirm();
  const { open } = useToast();
  const { mutate } = usePostReportMemberMutation();

  const handleReportMember = async (memberId?: number) => {
    if (!memberId) throw new Error('Invalid Member id');

    const result = await confirm({
      title: '이 멤버를 신고하시겠습니까?',
      description: '멤버를 신고할 경우, 메이커스에서 검토를 거쳐 적절한 조치 및 제재를 취할 예정이에요.',
      okButtonText: '신고하기',
      cancelButtonText: '취소',
      maxWidth: 400,
    });

    if (result) {
      mutate(
        { reportMemberId: memberId },
        {
          onSuccess: () => {
            open({
              icon: 'success',
              content: '신고가 완료되었어요.\n건전한 커뮤니티를 함께 만들어주셔서 감사해요!',
              style: {
                content: {
                  whiteSpace: 'pre-wrap',
                },
              },
            });
          },
        },
      );
    }
  };

  return { handleReportMember };
};
