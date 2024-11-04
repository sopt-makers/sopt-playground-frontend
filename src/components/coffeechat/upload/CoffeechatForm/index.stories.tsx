import { yupResolver } from '@hookform/resolvers/yup';
import { Meta } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import CoffeechatForm from '@/components/coffeechat/upload/CoffeechatForm';
import { coffeeChatchema } from '@/components/coffeechat/upload/CoffeechatForm/schema';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
import UploadButton from '@/components/coffeechat/upload/CoffeechatForm/UploadButton';

const form = {
  memberInfo: {
    career: '주니어 (0-3년)',
    introduction: '안녕하세요! 저는 프론트엔드 개발자로 다양한 프로젝트 경험을 쌓고 있습니다.',
  },
  coffeeChatInfo: {
    sections: ['프론트', '디자인'], // 다중 선택 가능 (전체, 기획, 디자인, 웹, 서버, 안드로이드, iOS)
    bio: '프론트엔드 커리어 상담',
    topicTypes: ['포트폴리오', '이력서/자소서'], // 창업, 네트워킹, 프로젝트, 커리어 등 다중 선택 가능
    topic: '프론트엔드 개발자로서의 커리어에 대해 상담하고 싶습니다.\n포트폴리오 제작과 인터뷰 팁도 나누고자 합니다.',
    meetingType: '온라인', // 무관, 온라인, 오프라인 중 하나 선택
    guideline: '시간 약속을 꼭 지켜주세요.\n질문은 미리 준비해 오시면 더욱 좋습니다.',
  },
};

export default {
  component: CoffeechatForm,
  decorators: [
    (Story) => {
      const formMethods = useForm<CoffeechatFormContent>({
        resolver: yupResolver(coffeeChatchema),
        defaultValues: form,
        mode: 'onChange',
      });
      return (
        <FormProvider {...formMethods}>
          <Story />
          <UploadButton uploadType='오픈' />
        </FormProvider>
      );
    },
  ],
} as Meta<typeof CoffeechatForm>;

export const Default = {
  name: '기본',
};
