import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { COFFEECHAT_MOBILE_MEDIA_QUERY } from '@/components/coffeechat/mediaQuery';
import CoffeechatInfoForm from '@/components/coffeechat/upload/CoffeechatForm/CoffeechatInfoForm';
import MyInfoForm from '@/components/coffeechat/upload/CoffeechatForm/MyInfoForm';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';

interface CoffeechatFormProps {
  form: CoffeechatFormContent;
  onSubmit: () => void;
}

export default function CoffeechatForm({ form, onSubmit }: CoffeechatFormProps) {
  const myInfoSchema = yup.object().shape({
    career: yup.string().required('경력을 선택해주세요'),
    introduction: yup.string().required('자기소개를 입력해주세요'),
  });

  const coffeeChatInfoSchema = yup.object().shape({
    sections: yup.array().of(yup.string()).required('관련 분야를 선택해주세요'),
    bio: yup.string().required('커피챗 제목을 입력해주세요'),
    topicTypes: yup.array().of(yup.string()).required('커피챗 주제 키워드를 선택해주세요'),
    topic: yup.string().required('커피챗 주제 소개를 입력해주세요'),
    meetingType: yup.string().nullable(),
    guideline: yup.string().nullable(),
  });

  const schema = yup.object().shape({
    memberInfo: myInfoSchema,
    coffeeChatInfo: coffeeChatInfoSchema,
  });

  const methods = useForm<CoffeechatFormContent>({ resolver: yupResolver(schema), defaultValues: form });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SectionTitle>1. 내 정보</SectionTitle>
        <MyInfoForm />
        <SectionTitle>2. 커피챗 정보</SectionTitle>
        <CoffeechatInfoForm />
      </form>
    </FormProvider>
  );
}

const SectionTitle = styled.header`
  border-bottom: 1px solid ${colors.gray800};
  padding-bottom: 12px;
  width: 100%;
  color: ${colors.white};
  ${fonts.HEADING_24_B};
  margin-bottom: 20px;
  margin-top: 60px;

  @media ${COFFEECHAT_MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_20_B};
    margin-top: 40px;
  }
`;
