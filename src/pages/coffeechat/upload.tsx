import { DialogOptionType, useDialog, useToast } from '@sopt-makers/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { useEffect, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';

import { uploadCoffeechat } from '@/api/endpoint/coffeechat/uploadCoffeechat';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetMemberProfileById } from '@/api/endpoint_LEGACY/hooks';
import AuthRequired from '@/components/auth/AuthRequired';
import CoffeechatLoading from '@/components/coffeechat/Loading';
import CoffeechatUploadPage from '@/components/coffeechat/page/CoffeechatUploadPage';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { setLayout } from '@/utils/layout';

const CoffeechatUpload = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { open: toastOpen } = useToast();
  const { open } = useDialog();
  const { logSubmitEvent } = useEventLogger();

  const { data: me } = useGetMemberOfMe();
  const { data: profile } = useGetMemberProfileById(me?.id ?? undefined);

  useEffect(() => {
    me?.isCoffeeChatActivate &&
      open({
        title: `이미 오픈한 커피챗이 있어요!`,
        description: `커피챗은 한 개만 오픈할 수 있어요. 등록된 커피챗을 삭제한 후 다시 시도해주세요.`,
        type: 'single',
        typeOptions: {
          approveButtonText: '확인',
          buttonFunction: async () => {
            await router.push(playgroundLink.coffeechat());
          },
        },
      });
  }, [me?.isCoffeeChatActivate]);

  const sortedSoptActivities = useMemo(() => {
    if (!profile?.soptActivities) {
      return [];
    }
    const sorted = [...profile.soptActivities];
    sorted.sort((a, b) => b.generation - a.generation);
    return sorted;
  }, [profile?.soptActivities]);

  const generations = sortedSoptActivities.map((activity) => activity.generation);
  const part = sortedSoptActivities.map((activity) => activity.part);

  const { mutate, isPending } = useMutation({
    mutationFn: (reqeustBody: CoffeechatFormContent) => uploadCoffeechat.request({ ...reqeustBody }),
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
        coffeeChatInfo: { ...coffeeChatInfo },
      },
      {
        onSuccess: async () => {
          queryClient.invalidateQueries({
            predicate: (query) => ['getRecentCoffeeChat', 'getMembersCoffeeChat'].includes(query.queryKey[0] as string),
          });
          queryClient.invalidateQueries({ queryKey: ['getMemberOfMe'] });
          logSubmitEvent('openCoffeechat', {
            career: memberInfo.career
              ? Array.isArray(memberInfo.career)
                ? memberInfo.career[0]
                : memberInfo.career
              : '',
            organization:
              profile?.careers && profile?.careers.length > 0
                ? profile?.careers[0].companyName
                : profile?.university ?? '',
            job: profile?.careers && profile?.careers.length > 0 ? profile?.careers[0].title : '',
            bio: memberInfo.introduction ?? '',
            section: coffeeChatInfo.sections ?? [],
            title: coffeeChatInfo.bio ?? '',
            topic_tag: coffeeChatInfo.topicTypes ?? [],
            topic_detail: coffeeChatInfo.topic ?? '',
            guideline: coffeeChatInfo.guideline ?? '',
            meeting_type: coffeeChatInfo.meetingType ?? '',
            generation: generations ?? [],
            part: part ?? [],
          });
          toastOpen({ icon: 'success', content: '커피챗이 오픈됐어요! 경험을 나눠주셔서 감사해요.' });
          await router.push(playgroundLink.coffeechat());
        },
        onError: (error) => {
          const option: DialogOptionType = {
            title: `오류가 발생했어요.`,
            description: `${error.message}`,
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

  const defaultForm = {
    memberInfo: {
      career: null,
      introduction: null,
    },
    coffeeChatInfo: {
      sections: [],
      bio: null,
      topicTypes: [],
      topic: null,
      meetingType: null,
      guideline: null,
    },
  };

  if (isPending) {
    return <CoffeechatLoading />;
  }

  return (
    <AuthRequired>
      <CoffeechatUploadPage uploadType='오픈' form={defaultForm} onSubmit={onSubmit} />
    </AuthRequired>
  );
};

setLayout(CoffeechatUpload, 'header');

export default CoffeechatUpload;
