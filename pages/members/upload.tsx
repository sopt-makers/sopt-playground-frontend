import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import { postMemberProfile } from '@/api/members';
import { ProfileRequest } from '@/api/members/type';
import AuthRequired from '@/components/auth/AuthRequired';
import { MEMBER_DEFAULT_VALUES } from '@/components/members/upload/constants';
import MemberForm from '@/components/members/upload/forms/Form';
import { memberFormSchema } from '@/components/members/upload/schema';
import BasicFormSection from '@/components/members/upload/sections/BasicFormSection';
import CareerFormSection from '@/components/members/upload/sections/CareerFormSection';
import PublicQuestionFormSection from '@/components/members/upload/sections/PublicQuestionFormSection';
import SoptActivityFormSection from '@/components/members/upload/sections/SoptActivityFormSection';
import { MemberUploadForm } from '@/components/members/upload/types';
import { formatBirthday } from '@/components/members/upload/utils';
import { playgroundLink } from '@/constants/links';
import { setLayout } from '@/utils/layout';

export default function MemberUploadPage() {
  const formMethods = useForm<MemberUploadForm>({
    defaultValues: MEMBER_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(memberFormSchema),
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const { handleSubmit } = formMethods;

  const onSubmit = async (formData: MemberUploadForm) => {
    const { birthday, links, careers } = formData;
    const requestBody: ProfileRequest = {
      ...formData,
      birthday: formatBirthday(birthday),
      links: links.filter((link) => Object.values(link).every((item) => !!item)),
      careers: careers
        .map((career) => (career.endDate ? career : { ...career, endDate: null }))
        .filter((career) => !Object.values(career).some((item) => item === '')),
    };
    const response = await postMemberProfile(requestBody);

    queryClient.invalidateQueries(['getMemberProfileOfMe']);
    queryClient.invalidateQueries(['getMemberProfileById', response.id]);
    queryClient.invalidateQueries(['getMemberProfile']);

    router.push(playgroundLink.memberDetail(response.id));
  };

  return (
    <AuthRequired>
      <FormProvider {...formMethods}>
        <MemberForm type='upload' onSubmit={handleSubmit(onSubmit)}>
          <BasicFormSection />
          <SoptActivityFormSection />
          <CareerFormSection />
          <PublicQuestionFormSection />
        </MemberForm>
      </FormProvider>
    </AuthRequired>
  );
}

setLayout(MemberUploadPage, 'header');
