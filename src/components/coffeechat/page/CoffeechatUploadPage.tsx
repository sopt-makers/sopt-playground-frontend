import CoffeechatForm from '@/components/coffeechat/upload/CoffeechatForm';
import { coffeChatchema } from '@/components/coffeechat/upload/CoffeechatForm/schema';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

interface CoffeechatFormProps {
  form: CoffeechatFormContent;
  onSubmit: () => void;
}

export default function CoffeechatUploadPage({ form, onSubmit }: CoffeechatFormProps) {
  const methods = useForm<CoffeechatFormContent>({ resolver: yupResolver(coffeChatchema), defaultValues: form });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CoffeechatForm />
      </form>
    </FormProvider>
  );
}
