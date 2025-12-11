import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useGetMemberProfileOfMe } from '@/api/endpoint_LEGACY/hooks';
import { postMemberProfile } from '@/api/endpoint_LEGACY/members';
import { ProfileRequest } from '@/api/endpoint_LEGACY/members/type';
import AuthRequired from '@/components/auth/AuthRequired';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';
import { MEMBER_DEFAULT_VALUES, UNSELECTED } from '@/components/members/upload/constants';
import { formatBirthday, getSojuCapacityApiValue } from '@/components/members/upload/format';
import MemberForm from '@/components/members/upload/forms/Form';
import MemberFormHeader from '@/components/members/upload/forms/FormHeader';
import BasicFormSection from '@/components/members/upload/FormSection/Basic';
import CareerFormSection from '@/components/members/upload/FormSection/Career';
import SoptActivityFormSection from '@/components/members/upload/FormSection/SoptActivity';
import TmiFormSection from '@/components/members/upload/FormSection/Tmi';
import { memberFormSchema } from '@/components/members/upload/schema';
import { MemberUploadForm, SoptActivity } from '@/components/members/upload/types';
import { setLayout } from '@/utils/layout';

export default function MemberUploadPage() {
  const formMethods = useForm<MemberUploadForm>({
    defaultValues: MEMBER_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(memberFormSchema),
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: myProfile } = useGetMemberProfileOfMe();
  const lastUnauthorized = useLastUnauthorized();

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = formMethods;

  const onSubmit = async (formData: MemberUploadForm) => {
    const {
      birthday,
      links,
      careers,
      mbti,
      sojuCapacity,
      favor,
      workPreference,
      longIntroduction,
      name,
      profileImage,
      phone,
      email,
      address,
      university,
      major,
      introduction,
      skill,
      activities,
      allowOfficial,
      mbtiDescription,
      interest,
      isPhoneBlind,
    } = formData;

    const requestBody: ProfileRequest = {
      name,
      profileImage,
      phone,
      email,
      address,
      university,
      major,
      introduction,
      skill,
      allowOfficial,
      mbtiDescription,
      interest,
      activities: activities.map((activity) => {
        const newActivity: SoptActivity = { ...activity, generation: activity.generation.replace(/기/g, '') };
        if (activity.team === UNSELECTED || activity.team === '') {
          return { ...newActivity, team: null };
        }
        return newActivity;
      }),
      birthday: formatBirthday(birthday),
      links: links.filter((link) => Object.values(link).every((item) => !!item)),
      careers: careers
        .map((career) => (career.endDate ? career : { ...career, endDate: null }))
        .filter((career) => !Object.values(career).some((item) => item === '')),
      mbti: mbti ? mbti.join('') : mbti,
      sojuCapacity: getSojuCapacityApiValue(sojuCapacity) ?? null,
      workPreference: {
        ideationStyle: workPreference.ideationStyle,
        workTime: workPreference.workTime,
        communicationStyle: workPreference.communicationStyle,
        workPlace: workPreference.workPlace,
        feedbackStyle: workPreference.feedbackStyle,
      },
      userFavor: {
        isPourSauceLover: favor.sweetAndSourPork === null ? null : favor.sweetAndSourPork === '부먹',
        isHardPeachLover: favor.peach === null ? null : favor.peach === '딱복',
        isMintChocoLover: favor.mintChocolate === null ? null : favor.mintChocolate === '민초',
        isRedBeanFishBreadLover: favor.fishBread === null ? null : favor.fishBread === '팥붕',
        isSojuLover: favor.alcohol === null ? null : favor.alcohol === '소주',
        isRiceTteokLover: favor.tteokbokki === null ? null : favor.tteokbokki === '쌀떡',
      },
      selfIntroduction: longIntroduction,
      isPhoneBlind,
    };

    const response = await postMemberProfile(requestBody);

    queryClient.invalidateQueries({
      queryKey: ['getMemberProfileOfMe'],
    });
    queryClient.invalidateQueries({
      queryKey: ['getMemberProfileById', response.id],
    });
    queryClient.invalidateQueries({
      queryKey: ['getMemberProfile'],
    });
    queryClient.invalidateQueries({
      queryKey: ['getMembersCoffeeChat'],
    });

    // router.replace(lastUnauthorized.popPath() ?? '/');
    router.replace('/members/complete'); // 프로필 등록 완료 페이지로 이동
  };

  useEffect(() => {
    if (myProfile) {
      reset({
        ...MEMBER_DEFAULT_VALUES,
        name: myProfile.name,
        email: myProfile.email ?? '',
        phone: myProfile.phone ?? '',
        activities: myProfile.soptActivities
          .sort((a, b) => a.generation - b.generation)
          .map(({ generation, team, part }) => ({
            generation: `${generation}기`,
            part,
            team: team ?? '',
          })),
      });
    }
  }, [myProfile, reset]);

  return (
    <AuthRequired>
      <FormProvider {...formMethods}>
        <MemberForm type='upload' onSubmit={handleSubmit(onSubmit)} isValid={Object.keys(errors).length < 1}>
          <BasicFormSection />
          <SoptActivityFormSection />
          <CareerFormSection header={<MemberFormHeader title='나의 커리어' />} />
          <TmiFormSection />
        </MemberForm>
      </FormProvider>
    </AuthRequired>
  );
}

setLayout(MemberUploadPage, 'header');
