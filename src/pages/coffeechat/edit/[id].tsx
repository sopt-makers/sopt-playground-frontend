import { DialogOptionType, useDialog } from '@sopt-makers/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FieldValues } from 'react-hook-form';

import { editCoffeechat } from '@/api/endpoint/coffeechat/editCoffeechat';
import { useGetCoffeechatDetail } from '@/api/endpoint/coffeechat/getCoffeechatDetail';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import AuthRequired from '@/components/auth/AuthRequired';
import CoffeechatUploadPage from '@/components/coffeechat/page/CoffeechatUploadPage';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
import Loading from '@/components/common/Loading';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const CoffeechatEdit = () => {
  const { query, status } = useStringRouterQuery(['id'] as const);
  const memberId = status === 'success' ? query.id : '';
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: me } = useGetMemberOfMe();
  const { data: openerProfile, isError, error } = useGetCoffeechatDetail(memberId);
  const { open } = useDialog();

  const { mutate, isPending } = useMutation({
    mutationFn: (reqeustBody: CoffeechatFormContent) => editCoffeechat.request({ ...reqeustBody }),
  });

  const onSubmit = <T extends FieldValues>(values: T) => {
    const data: CoffeechatFormContent = values as unknown as CoffeechatFormContent;
    const { memberInfo, coffeeChatInfo } = data;

    mutate(
      {
        memberInfo: { ...memberInfo, career: memberInfo.career ? memberInfo.career[0] : null },
        coffeeChatInfo: { ...coffeeChatInfo, meetingType: coffeeChatInfo.meetingType ?? '온/오프라인' },
      },
      {
        onSuccess: async () => {
          queryClient.invalidateQueries({
            predicate: (query) => ['getRecentCoffeeChat', 'getMembersCoffeeChat'].includes(query.queryKey[0] as string),
          });
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
  console.log(openerProfile);
  // TODO: 데이터 get api 패칭 필요
  const defaultForm = {
    memberInfo: {
      career: '주니어 (0-3년)', //TODO: 데이터 가져와서 배열에 담기
      introduction: '안녕하세요! 저는 프론트엔드 개발자로 다양한 프로젝트 경험을 쌓고 있습니다.',
    },
    coffeeChatInfo: {
      sections: ['프론트', '디자인'],
      bio: '프론트엔드 커리어 상담',
      topicTypes: ['포트폴리오', '이력서/자소서'],
      topic: '프론트엔드 개발자로서의 커리어에 대해 상담하고 싶습니다.\n포트폴리오 제작과 인터뷰 팁도 나누고자 합니다.',
      meetingType: '온라인',
      guideline: '시간 약속을 꼭 지켜주세요.\n질문은 미리 준비해 오시면 더욱 좋습니다.',
    },
  };

  if (isPending) {
    // TODO: 데이터 get 해올 때의 isPending도 추가
    return <Loading />;
  }

  // MEMO: url에서 직접 id 변경하여 접속하는 경우, 다른 사람의 커피챗 수정 불가능하도록 막기
  if (memberId !== String(me?.id)) {
    return <Loading />;
  }

  if (isError) {
    const option: DialogOptionType = {
      title: `${error}`,
      description: ``,
      type: 'single',
      typeOptions: {
        approveButtonText: '확인',
        buttonFunction: async () => await router.push(playgroundLink.coffeechat()),
      },
    };

    open(option);
  }

  return (
    <AuthRequired>
      {(status === 'loading' || status === 'error') && null}
      {status === 'success' ? <CoffeechatUploadPage uploadType='수정' form={defaultForm} onSubmit={onSubmit} /> : null}
    </AuthRequired>
  );
};

setLayout(CoffeechatEdit, 'header');

export default CoffeechatEdit;
