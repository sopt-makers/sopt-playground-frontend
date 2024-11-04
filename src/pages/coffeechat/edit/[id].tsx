import { DialogOptionType, useDialog, useToast } from '@sopt-makers/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FieldValues } from 'react-hook-form';

import { editCoffeechat } from '@/api/endpoint/coffeechat/editCoffeechat';
import { useGetCoffeechatDetail } from '@/api/endpoint/coffeechat/getCoffeechatDetail';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import AuthRequired from '@/components/auth/AuthRequired';
import CoffeechatLoading from '@/components/coffeechat/Loading';
import CoffeechatUploadPage from '@/components/coffeechat/page/CoffeechatUploadPage';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const CoffeechatEdit = () => {
  const { query, status } = useStringRouterQuery(['id'] as const);
  const memberId = status === 'success' ? query.id : '';
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: me } = useGetMemberOfMe();
  const { data: openerProfile, isError, error, isPending: isDetailPending } = useGetCoffeechatDetail(memberId);
  const { open } = useDialog();
  const { open: toastOpen } = useToast();
  const { logSubmitEvent } = useEventLogger();

  const { mutate, isPending: isEditPending } = useMutation({
    mutationFn: (reqeustBody: CoffeechatFormContent) => editCoffeechat.request({ ...reqeustBody }),
  });

  const onSubmit = <T extends FieldValues>(values: T) => {
    const data: CoffeechatFormContent = values as unknown as CoffeechatFormContent;
    const { memberInfo, coffeeChatInfo } = data;

    mutate(
      {
        memberInfo: {
          ...memberInfo,
          career: memberInfo.career
            ? Array.isArray(memberInfo.career)
              ? memberInfo.career[0]
              : memberInfo.career
            : null,
        },
        coffeeChatInfo: { ...coffeeChatInfo, meetingType: coffeeChatInfo.meetingType ?? '온/오프라인' },
      },
      {
        onSuccess: async () => {
          queryClient.invalidateQueries({
            predicate: (query) => ['getRecentCoffeeChat', 'getMembersCoffeeChat'].includes(query.queryKey[0] as string),
          });
          toastOpen({ icon: 'success', content: '커피챗이 오픈됐어요! 경험을 나눠주셔서 감사해요.' });
          logSubmitEvent('editCoffeechat');
          await router.push(playgroundLink.coffeechatDetail(me?.id ?? ''));
        },
        onError: (error) => {
          const option: DialogOptionType = {
            title: `${error.message}`,
            description: ``,
            type: 'single',
            typeOptions: {
              approveButtonText: '확인',
              buttonFunction: async () => await router.push(playgroundLink.coffeechat()),
            },
          };
          open(option);
        },
      },
    );
  };

  // FIXME: url에서 직접 id 변경하여 접속하는 경우, 다른 사람의 커피챗 수정 불가능하도록 막기
  // useEffect(() => {
  //   if (memberId !== String(me?.id)) {
  //     open({
  //       title: '다른 사람의 커피챗은 수정할 수 없어요',
  //       description: ``,
  //       type: 'single',
  //       typeOptions: {
  //         approveButtonText: '확인',
  //         buttonFunction: async () => await router.push(playgroundLink.coffeechat()),
  //       },
  //     });
  //   }
  // }, [me?.id, memberId, open, router]);

  // FIXME: 존재하지 않는 커피챗 id 접속
  // useEffect(() => {
  //   if (isError) {
  //     const axiosError = error as AxiosError;

  //     open({
  //       title: `${axiosError?.response?.data}`,
  //       description: ``,
  //       type: 'single',
  //       typeOptions: {
  //         approveButtonText: '확인',
  //         buttonFunction: async () => await router.push(playgroundLink.coffeechat()),
  //       },
  //     });
  //   }
  // }, [error, isError, open, router]);

  const defaultForm = {
    memberInfo: {
      career: openerProfile?.career,
      introduction: openerProfile?.introduction,
    },
    coffeeChatInfo: {
      sections: openerProfile?.sections,
      bio: openerProfile?.bio,
      topicTypes: openerProfile?.topicTypeList,
      topic: openerProfile?.topic,
      meetingType: openerProfile?.meetingType,
      guideline: openerProfile?.guideline,
    },
  };

  if (isDetailPending || isEditPending) {
    return <CoffeechatLoading />;
  }

  return (
    <AuthRequired>
      {(status === 'loading' || status === 'error') && null}
      {status === 'success' && openerProfile && memberId === String(me?.id) && !isError ? (
        <CoffeechatUploadPage uploadType='수정' form={defaultForm} onSubmit={onSubmit} />
      ) : null}
    </AuthRequired>
  );
};

setLayout(CoffeechatEdit, 'header');

export default CoffeechatEdit;
