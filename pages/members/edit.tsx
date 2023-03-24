import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useGetMemberProfileOfMe } from '@/api/hooks';
import { putMemberProfile } from '@/api/members';
import { ProfileRequest } from '@/api/members/type';
import AuthRequired from '@/components/auth/AuthRequired';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { MEMBER_DEFAULT_VALUES } from '@/components/members/upload/constants';
import {
  formatBirthday,
  getMbtiFromApiValue,
  getSojuCapacityApiValue,
  getSojuCapacityFromApiValue,
} from '@/components/members/upload/format';
import MemberForm from '@/components/members/upload/forms/Form';
import { memberFormSchema } from '@/components/members/upload/schema';
import BasicFormSection from '@/components/members/upload/sections/BasicFormSection';
import CareerFormSection from '@/components/members/upload/sections/CareerFormSection';
import PublicQuestionFormSection from '@/components/members/upload/sections/PublicQuestionFormSection';
import SoptActivityFormSection from '@/components/members/upload/sections/SoptActivityFormSection';
import TmiSection from '@/components/members/upload/sections/TmiSection';
import { MemberUploadForm } from '@/components/members/upload/types';
import { playgroundLink } from '@/constants/links';
import { setLayout } from '@/utils/layout';

export default function MemberEditPage() {
  const { logSubmitEvent } = useEventLogger();
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
    const {
      birthday,
      links,
      careers,
      mbti,
      sojuCapacity,
      favor,
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
      idealType,
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
      activities,
      allowOfficial,
      mbtiDescription,
      interest,
      idealType,
      birthday: formatBirthday(birthday),
      links: links.filter((link) => Object.values(link).every((item) => !!item)),
      careers: careers
        .map((career) => (career.endDate ? career : { ...career, endDate: null }))
        .filter((career) => !Object.values(career).some((item) => item === '')),
      mbti: mbti ? mbti.join('') : mbti,
      sojuCapacity: getSojuCapacityApiValue(sojuCapacity) ?? null,
      userFavor: {
        isPourSauceLover: favor.sweetAndSourPork === null ? null : favor.sweetAndSourPork === '부먹',
        isHardPeachLover: favor.peach === null ? null : favor.peach === '딱복',
        isMintChocoLover: favor.mintChocolate === null ? null : favor.mintChocolate === '민초',
        isRedBeanFishBreadLover: favor.fishBread === null ? null : favor.fishBread === '팥붕',
        isSojuLover: favor.alcohol === null ? null : favor.alcohol === '소주',
        isRiceTteokLover: favor.tteokbokki === null ? null : favor.tteokbokki === '쌀떡',
      },
      selfIntroduction: longIntroduction,
    };

    const response = await putMemberProfile(requestBody);

    queryClient.invalidateQueries(['getMemberProfileOfMe']);
    queryClient.invalidateQueries(['getMemberProfileById', response.id]);
    queryClient.invalidateQueries(['getMemberProfile']);

    router.push(playgroundLink.memberDetail(response.id));

    logSubmitEvent('editProfile', {});
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
        mbti: getMbtiFromApiValue(myProfile.mbti),
        mbtiDescription: myProfile.mbtiDescription,
        sojuCapacity: getSojuCapacityFromApiValue(myProfile.sojuCapacity),
        interest: myProfile.interest,
        favor: {
          sweetAndSourPork:
            myProfile.userFavor.isPourSauceLover === null
              ? null
              : myProfile.userFavor.isPourSauceLover
              ? '부먹'
              : '찍먹',
          peach:
            myProfile.userFavor.isHardPeachLover === null
              ? null
              : myProfile.userFavor.isHardPeachLover
              ? '딱복'
              : '물복',
          alcohol: myProfile.userFavor.isSojuLover === null ? null : myProfile.userFavor.isSojuLover ? '소주' : '맥주',
          fishBread:
            myProfile.userFavor.isRedBeanFishBreadLover === null
              ? null
              : myProfile.userFavor.isRedBeanFishBreadLover
              ? '팥붕'
              : '슈붕',
          mintChocolate:
            myProfile.userFavor.isMintChocoLover === null
              ? null
              : myProfile.userFavor.isMintChocoLover
              ? '민초'
              : '반민초',
          tteokbokki:
            myProfile.userFavor.isRiceTteokLover === null
              ? null
              : myProfile.userFavor.isRiceTteokLover
              ? '쌀떡'
              : '밀떡',
        },
        idealType: myProfile.idealType,
        longIntroduction: myProfile.selfIntroduction,
      });
    }
  }, [myProfile, reset]);

  return (
    <AuthRequired>
      <FormProvider {...formMethods}>
        <MemberForm type='edit' onSubmit={handleSubmit(onSubmit)}>
          <BasicFormSection />
          <SoptActivityFormSection />
          <TmiSection />
          <CareerFormSection />
          <PublicQuestionFormSection />
        </MemberForm>
      </FormProvider>
    </AuthRequired>
  );
}

setLayout(MemberEditPage, 'header');
