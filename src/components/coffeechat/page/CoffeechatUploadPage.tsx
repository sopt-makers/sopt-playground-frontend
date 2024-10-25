import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import DesktopCoffeechatUploadLayout from '@/components/coffeechat/page/layout/DesktopCoffeechatUploadLayout';
import MobileCoffeechatUploadLayout from '@/components/coffeechat/page/layout/MobileCoffeechatUploadLayout';
import CoffeechatForm from '@/components/coffeechat/upload/CoffeechatForm';
import { coffeeChatchema } from '@/components/coffeechat/upload/CoffeechatForm/schema';
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
  const methods = useForm<CoffeechatFormContent>({ resolver: yupResolver(coffeeChatchema), defaultValues: form });
  const { handleSubmit, setFocus } = methods;

  const findFirstErrorFieldInOrder = (errors: FieldValues): string | null => {
    const fieldOrder = [
      'memberInfo.career',
      'memberInfo.introduction',
      'coffeeChatInfo.sections',
      'coffeeChatInfo.bio',
      'coffeeChatInfo.topicTypes',
      'coffeeChatInfo.topic',
      'coffeeChatInfo.meetingType',
      'coffeeChatInfo.guideline',
    ];

    for (const fieldPath of fieldOrder) {
      const keys = fieldPath.split('.');
      let currentError = errors;

      for (const key of keys) {
        currentError = currentError[key];
        if (!currentError) break;
      }

      if (currentError?.message) {
        return fieldPath;
      }
    }

    return null;
  };

  const onError = (errors: FieldValues) => {
    const firstErrorField = findFirstErrorFieldInOrder(errors);

    if (firstErrorField) {
      setFocus(firstErrorField as keyof CoffeechatFormContent);
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      console.log(errorElement);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form id='coffeechatForm' onSubmit={handleSubmit(onSubmit, onError)}>
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
