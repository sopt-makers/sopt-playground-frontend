import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useGetMemberProfileOfMe } from '@/api/hooks';
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

export default function MemberEditPage() {
  const formMethods = useForm<MemberUploadForm>({
    defaultValues: MEMBER_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(memberFormSchema),
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: myProfile } = useGetMemberProfileOfMe({ cacheTime: Infinity, staleTime: Infinity });

  const { handleSubmit, reset } = formMethods;

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

  useEffect(() => {
    if (myProfile) {
      reset({
        name: myProfile.name,
        birthday: myProfile.birthday
          ? {
              year: Number(myProfile.birthday.split('-')[0]).toString(),
              month: Number(myProfile.birthday.split('-')[1]).toString(),
              day: Number(myProfile.birthday.split('-')[2]).toString(),
            }
          : undefined,
        phone: myProfile.phone,
        email: myProfile.email,
        address: myProfile.address,
        university: myProfile.university,
        major: myProfile.major,
        introduction: myProfile.introduction,
        skill: myProfile.skill,
        links: myProfile.links,
        activities: myProfile.activities.map((act) => {
          const [generation, part] = act.cardinalInfo.split(',');
          return {
            generation,
            part,
            team: act.cardinalActivities[0].team,
          };
        }),
        allowOfficial: myProfile.allowOfficial,
        profileImage: myProfile.profileImage,
        careers: myProfile.careers.map((career) => ({
          ...career,
          endDate: career.endDate ?? '',
        })),
      });
    }
  }, [myProfile, reset]);

  return (
    <AuthRequired>
      <FormProvider {...formMethods}>
        <MemberForm type='edit' onSubmit={handleSubmit(onSubmit)}>
          <BasicFormSection />
          <SoptActivityFormSection />
          <CareerFormSection />
          <PublicQuestionFormSection />
        </MemberForm>
      </FormProvider>
    </AuthRequired>
  );
}

setLayout(MemberEditPage, 'header');
