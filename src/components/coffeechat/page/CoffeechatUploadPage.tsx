import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import DesktopCoffeechatUploadLayout from '@/components/coffeechat/page/layout/DesktopCoffeechatUploadLayout';
import MobileCoffeechatUploadLayout from '@/components/coffeechat/page/layout/MobileCoffeechatUploadLayout';
import CoffeechatForm from '@/components/coffeechat/upload/CoffeechatForm';
import { coffeeChatchema } from '@/components/coffeechat/upload/CoffeechatForm/schema';
import SubmitDialog from '@/components/coffeechat/upload/CoffeechatForm/SubmitDialog';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
import UploadButton from '@/components/coffeechat/upload/CoffeechatForm/UploadButton';
import ProgressBox from '@/components/coffeechat/upload/ProgressBox';
import UploadHeader from '@/components/coffeechat/upload/UploadHeader';
import useModalState from '@/components/common/Modal/useModalState';
import Responsive from '@/components/common/Responsive';
interface CoffeechatUploadPageProps {
  uploadType: '오픈' | '수정';
  form: CoffeechatFormContent;
  onSubmit: <T extends FieldValues>(values: T) => void;
}

export default function CoffeechatUploadPage({ uploadType, form, onSubmit }: CoffeechatUploadPageProps) {
  const methods = useForm<CoffeechatFormContent>({ resolver: yupResolver(coffeeChatchema), defaultValues: form });
  const { handleSubmit, setFocus, watch } = methods;
  const { isOpen, onClose, onOpen } = useModalState();

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

      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onOpen, onError)}>
        <SubmitDialog isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} uploadType={uploadType} />
        <>
          <Responsive only='desktop'>
            <DesktopCoffeechatUploadLayout
              main={
                <>
                  <UploadHeader uploadType={uploadType} />
                  <CoffeechatForm />
                </>
              }
              aside={
                <ProgressBox
                  uploadType={uploadType}
                  myInfoInprogress={!!watch('memberInfo.career')}
                  coffeechatInfoInprogress={
                    !!(
                      watch('coffeeChatInfo.sections') &&
                      watch('coffeeChatInfo.bio') &&
                      watch('coffeeChatInfo.topicTypes') &&
                      watch('coffeeChatInfo.topic')
                    )
                  }
                />
              }
              submitButton={<UploadButton uploadType={uploadType} />}
            />
          </Responsive>
          <Responsive only='mobile'>
            <MobileCoffeechatUploadLayout
              main={
                <>
                  <UploadHeader uploadType={uploadType} />
                  <CoffeechatForm />
                </>
              }
              submitButton={<UploadButton uploadType={uploadType} />}
            />
          </Responsive>
        </>
      </form>
    </FormProvider>
  );
}
