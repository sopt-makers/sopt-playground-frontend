import { useMutation } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';

import { uploadCoffeechat } from '@/api/endpoint/coffeechat/uploadCoffeechat';
import AuthRequired from '@/components/auth/AuthRequired';
import CoffeechatUploadPage from '@/components/coffeechat/page/CoffeechatUploadPage';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
import Loading from '@/components/common/Loading';
import { setLayout } from '@/utils/layout';

const CoffeechatUpload = () => {
  // const router = useRouter();
  // const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (reqeustBody: CoffeechatFormContent) => uploadCoffeechat.request({ ...reqeustBody }),
  });

  const handleUploadSubmit: SubmitHandler<CoffeechatFormContent> = (data) => {
    console.log('폼 제출 데이터:', data);
    // mutate(data, {
    //   onSuccess: async () => {
    //     console.log('업로드 성공!');
    //     // TODO: 쿼리 무효화 및 페이지 이동 처리
    //     // queryClient.invalidateQueries({ queryKey: 'coffeechat' });
    //     // await router.push(playgroundLink.coffeechat());
    //   },
    //   onError: (error) => {
    //     console.error('업로드 실패:', error);
    //   },
    // });
  };

  // const handleUploadSubmit = (data: CoffeechatFormContent) => {
  //   console.log(data);
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
      <CoffeechatUploadPage uploadType='오픈' form={defaultForm} onSubmit={handleUploadSubmit} />
    </AuthRequired>
  );
};

setLayout(CoffeechatUpload, 'header');

export default CoffeechatUpload;
