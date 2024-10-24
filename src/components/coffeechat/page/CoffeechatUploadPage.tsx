import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import DesktopCoffeechatUploadLayout from '@/components/coffeechat/page/layout/DesktopCoffeechatUploadLayout';
import MobileCoffeechatUploadLayout from '@/components/coffeechat/page/layout/MobileCoffeechatUploadLayout';
import CoffeechatForm from '@/components/coffeechat/upload/CoffeechatForm';
import { coffeChatchema } from '@/components/coffeechat/upload/CoffeechatForm/schema';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
import UploadButton from '@/components/coffeechat/upload/CoffeechatForm/UploadButton';
import ProgressBox from '@/components/coffeechat/upload/ProgressBox';
import Responsive from '@/components/common/Responsive';

interface CoffeechatUploadPageProps {
  uploadType: '오픈' | '수정';
  form: CoffeechatFormContent;
  onSubmit: SubmitHandler<CoffeechatFormContent>;
}

export default function CoffeechatUploadPage({ uploadType, form, onSubmit }: CoffeechatUploadPageProps) {
  const methods = useForm<CoffeechatFormContent>({ resolver: yupResolver(coffeChatchema), defaultValues: form });

  return (
    <FormProvider {...methods}>
      <form id='coffeechatForm' onSubmit={methods.handleSubmit(onSubmit)}>
        <Responsive only='desktop'>
          <DesktopCoffeechatUploadLayout
            main={<CoffeechatForm />}
            aside={<ProgressBox uploadType={uploadType} myInfoInprogress={false} coffeechatInfoInprogress={false} />}
            submitButton={<UploadButton />}
          />
        </Responsive>
        <Responsive only='mobile'>
          <MobileCoffeechatUploadLayout main={<CoffeechatForm />} submitButton={<UploadButton />} />
        </Responsive>
      </form>
    </FormProvider>
  );
}
