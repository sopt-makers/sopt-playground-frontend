import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { usePutMemberProfileMutation } from '@/api/endpoint/members/putMemberProfile';
import { useGetMemberProfileOfMe } from '@/api/endpoint_LEGACY/hooks';
import { ProfileRequest } from '@/api/endpoint_LEGACY/members/type';
import AuthRequired from '@/components/auth/AuthRequired';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';
import useToast from '@/components/common/Toast/useToast';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import {
  DEFAULT_CAREER,
  DEFAULT_FAVOR,
  DEFAULT_LINK,
  MEMBER_DEFAULT_VALUES,
  UNSELECTED,
} from '@/components/members/upload/constants';
import {
  formatBirthday,
  getMbtiFromApiValue,
  getSojuCapacityApiValue,
  getSojuCapacityFromApiValue,
} from '@/components/members/upload/format';
import MemberForm from '@/components/members/upload/forms/Form';
import MemberFormHeader from '@/components/members/upload/forms/FormHeader';
import BasicFormSection from '@/components/members/upload/FormSection/Basic';
import CareerFormSection from '@/components/members/upload/FormSection/Career';
import SoptActivityFormSection from '@/components/members/upload/FormSection/SoptActivity';
import TmiFormSection from '@/components/members/upload/FormSection/Tmi';
import { memberFormSchema } from '@/components/members/upload/schema';
import { MemberUploadForm, SoptActivity } from '@/components/members/upload/types';
import { playgroundLink } from '@/constants/links';
import { setLayout } from '@/utils/layout';

import { useGetMemberOfMe } from '../../api/endpoint/members/getMemberOfMe';

export default function MemberEditPage() {
  const { logSubmitEvent } = useEventLogger();
  const formMethods = useForm<MemberUploadForm>({
    defaultValues: MEMBER_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(memberFormSchema),
  });
  const router = useRouter();
  const { data: myProfile, isLoading: isLoadingMyProfile } = useGetMemberProfileOfMe();
  const { data: me, isLoading: isLoadingMe } = useGetMemberOfMe();
  const { mutate } = usePutMemberProfileMutation();
  const toast = useToast();

  const lastUnauthorized = useLastUnauthorized();

  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = formMethods;

  const onSubmit = async (formData: MemberUploadForm) => {
    if (isLoadingMe || isLoadingMyProfile) {
      toast.show({ message: '다시 시도해주세요.' });
      return;
    }

    if (!isDirty) {
      me && router.push(playgroundLink.memberDetail(me.id.toString()));
      return;
    }

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

    mutate(requestBody, {
      onSuccess: ({ id }) => router.replace(lastUnauthorized.popPath() ?? playgroundLink.memberDetail(id)),
    });

    logSubmitEvent('editProfile');
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
        links: myProfile.links.length ? myProfile.links : [DEFAULT_LINK],
        activities: myProfile.soptActivities
          .sort((a, b) => a.generation - b.generation)
          .map(({ generation, team, part }) => ({
            generation: `${generation}기`,
            part,
            team: team ?? '',
          })),
        allowOfficial: myProfile.allowOfficial,
        isPhoneBlind: myProfile.isPhoneBlind,
        profileImage: myProfile.profileImage,
        careers: myProfile.careers.length
          ? myProfile.careers.map((career) =>
              career.isCurrent
                ? {
                    ...career,
                    endDate: null,
                  }
                : career,
            )
          : [DEFAULT_CAREER],
        mbti: getMbtiFromApiValue(myProfile.mbti),
        mbtiDescription: myProfile.mbtiDescription,
        sojuCapacity: getSojuCapacityFromApiValue(myProfile.sojuCapacity),
        interest: myProfile.interest,
        favor: myProfile.userFavor
          ? {
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
              alcohol:
                myProfile.userFavor.isSojuLover === null ? null : myProfile.userFavor.isSojuLover ? '소주' : '맥주',
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
            }
          : DEFAULT_FAVOR,
        longIntroduction: myProfile.selfIntroduction,
      });
    }
  }, [myProfile, reset]);

  return (
    <AuthRequired>
      <FormProvider {...formMethods}>
        <MemberForm type='edit' onSubmit={handleSubmit(onSubmit)} isValid={Object.keys(errors).length < 1}>
          <BasicFormSection />
          <SoptActivityFormSection />
          <CareerFormSection header={<MemberFormHeader title='나의 커리어' />} />
          <TmiFormSection />
        </MemberForm>
      </FormProvider>
    </AuthRequired>
  );
}

setLayout(MemberEditPage, 'header');
