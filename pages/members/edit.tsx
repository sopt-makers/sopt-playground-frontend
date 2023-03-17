import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import { useGetMemberProfileOfMe } from '@/api/hooks';
import { postMemberProfile } from '@/api/members';
import { ProfileRequest } from '@/api/members/type';
import AuthRequired from '@/components/auth/AuthRequired';
import AdditionalFormSection from '@/components/members/upload/AdditionalInfoFormSection';
import BasicFormSection from '@/components/members/upload/BasicFormSection';
import CareerFormSection from '@/components/members/upload/CareerFormSection';
import { MEMBER_DEFAULT_VALUES } from '@/components/members/upload/constants';
import MemberForm from '@/components/members/upload/Form';
import PublicQuestionFormSection from '@/components/members/upload/PublicQuestionFormSection';
import { memberFormSchema } from '@/components/members/upload/schema';
import SoptActivityFormSection from '@/components/members/upload/SoptActivityFormSection';
import { MemberUploadForm } from '@/components/members/upload/types';
import { formatBirthday } from '@/components/members/upload/utils';
import { playgroundLink } from '@/constants/links';
import { setLayout } from '@/utils/layout';

export default function MemberEditPage() {
  const formMethods = useForm<MemberUploadForm>({
    defaultValues: MEMBER_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(memberFormSchema),
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const { handleSubmit, reset } = formMethods;

  useGetMemberProfileOfMe({
    onSuccess: (data) => {
      reset({
        name: data.name,
        birthday: data.birthday
          ? {
              year: Number(data.birthday.split('-')[0]).toString(),
              month: Number(data.birthday.split('-')[1]).toString(),
              day: Number(data.birthday.split('-')[2]).toString(),
            }
          : undefined,
        phone: data.phone,
        email: data.email,
        address: data.address,
        university: data.university,
        major: data.major,
        introduction: data.introduction,
        skill: data.skill,
        links: data.links,
        openToWork: data.openToWork,
        openToSideProject: data.openToSideProject,
        activities: data.activities.map((act) => {
          const [generation, part] = act.cardinalInfo.split(',');
          return {
            generation,
            part,
            team: act.cardinalActivities[0].team,
          };
        }),
        allowOfficial: data.allowOfficial,
        profileImage: data.profileImage,
        careers: data.careers.map((career) => ({
          ...career,
          endDate: career.endDate ?? '',
        })),
      });
    },
  });

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

    queryClient.invalidateQueries('getMemberProfileOfMe');
    queryClient.invalidateQueries(['getMemberProfileById', response.id]);

    router.push(playgroundLink.memberDetail(response.id));
  };

  return (
    <AuthRequired>
      <FormProvider {...formMethods}>
        <MemberForm type='edit' onSubmit={handleSubmit(onSubmit)}>
          <BasicFormSection />
          <SoptActivityFormSection />
          <CareerFormSection />
          <AdditionalFormSection />
          <PublicQuestionFormSection />
        </MemberForm>
      </FormProvider>
    </AuthRequired>
  );
}

setLayout(MemberEditPage, 'header');
