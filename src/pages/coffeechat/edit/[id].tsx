import { editCoffeechat } from '@/api/endpoint/coffeechat/editCoffeechat';
import AuthRequired from '@/components/auth/AuthRequired';
import CoffeechatUploadPage from '@/components/coffeechat/page/CoffeechatUploadPage';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
import Loading from '@/components/common/Loading';
import { setLayout } from '@/utils/layout';
import { useMutation } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';

const CoffeechatEdit = () => {
  // const router = useRouter();
  // const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (reqeustBody: CoffeechatFormContent) => editCoffeechat.request({ ...reqeustBody }),
  });

  const onSubmit = <T extends FieldValues>(values: T) => {
    const data: CoffeechatFormContent = values as unknown as CoffeechatFormContent;
    const { memberInfo, coffeeChatInfo } = data;

    mutate(
      {
        memberInfo: { ...memberInfo, career: memberInfo.career ? memberInfo.career[0] : null },
        coffeeChatInfo: { ...coffeeChatInfo },
      },
      {
        onSuccess: async () => {
          // TODO: 쿼리 무효화 및 페이지 이동 처리
          // queryClient.invalidateQueries({ queryKey: 'coffeechat' });
          // await router.push(playgroundLink.coffeechatdetail());
        },
        onError: (error) => {
          console.error('업로드 실패:', error);
        },
      },
    );
  };

  // TODO: 데이터 get api 패칭 필요
  const defaultForm = {
    memberInfo: {
      career: ['주니어 (0-3년)'], //TODO: 데이터 가져와서 배열에 담기
      introduction: '안녕하세요! 저는 프론트엔드 개발자로 다양한 프로젝트 경험을 쌓고 있습니다.',
    },
    coffeeChatInfo: {
      sections: ['프론트엔드', '디자인'],
      bio: '프론트엔드 커리어 상담',
      topicTypes: ['커리어', '포트폴리오'],
      topic: '프론트엔드 개발자로서의 커리어에 대해 상담하고 싶습니다.\n포트폴리오 제작과 인터뷰 팁도 나누고자 합니다.',
      meetingType: '온라인',
      guideline: '시간 약속을 꼭 지켜주세요.\n질문은 미리 준비해 오시면 더욱 좋습니다.',
    },
  };

  if (isPending) {
    // TODO: 데이터 get 해올 때의 isPending도 추가
    return <Loading />;
  }

  return (
    <AuthRequired>
      <CoffeechatUploadPage uploadType='수정' form={defaultForm} onSubmit={onSubmit} />
    </AuthRequired>
  );
};

setLayout(CoffeechatEdit, 'header');

export default CoffeechatEdit;
