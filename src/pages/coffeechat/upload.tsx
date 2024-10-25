import { useMutation } from '@tanstack/react-query';

import { uploadCoffeechat } from '@/api/endpoint/coffeechat/uploadCoffeechat';
import AuthRequired from '@/components/auth/AuthRequired';
import CoffeechatUploadPage from '@/components/coffeechat/page/CoffeechatUploadPage';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
import Loading from '@/components/common/Loading';
import { setLayout } from '@/utils/layout';
import { FieldValues } from 'react-hook-form';

const CoffeechatUpload = () => {
  // const router = useRouter();
  // const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (reqeustBody: CoffeechatFormContent) => uploadCoffeechat.request({ ...reqeustBody }),
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
          // await router.push(playgroundLink.coffeechat());
        },
        onError: (error) => {
          console.error('업로드 실패:', error);
        },
      },
    );
  };

  // const onSubmit = (data: CoffeechatFormContent) => {
  //   const { memberInfo, coffeeChatInfo } = data;
  //   mutate(
  //     {
  //       memberInfo: { ...memberInfo, career: memberInfo.career ? memberInfo.career[0] : null },
  //       coffeeChatInfo: { ...coffeeChatInfo },
  //     },
  //     {
  //       onSuccess: async () => {
  //         // TODO: 쿼리 무효화 및 페이지 이동 처리
  //         // queryClient.invalidateQueries({ queryKey: 'coffeechat' });
  //         // await router.push(playgroundLink.coffeechat());
  //       },
  //       onError: (error) => {
  //         console.error('업로드 실패:', error);
  //       },
  //     },
  //   );
  // };

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
    return <Loading />;
  }

  return (
    <AuthRequired>
      <CoffeechatUploadPage uploadType='오픈' form={defaultForm} onSubmit={onSubmit} />
    </AuthRequired>
  );
};

setLayout(CoffeechatUpload, 'header');

export default CoffeechatUpload;
