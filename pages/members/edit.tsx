import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useGetMemberProfileOfMe } from '@/api/endpoint_LEGACY/hooks';
import { putMemberProfile } from '@/api/endpoint_LEGACY/members';
import { ProfileRequest } from '@/api/endpoint_LEGACY/members/type';
import AuthRequired from '@/components/auth/AuthRequired';
import FormAccordion from '@/components/common/form/FormCollapsible';
import Responsive from '@/components/common/Responsive';
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
import PublicQuestionFormSection from '@/components/members/upload/FormSection/PublicQuestion';
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
  const queryClient = useQueryClient();
  const { data: myProfile, isLoading: isLoadingMemberProfileOfMe } = useGetMemberProfileOfMe({
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  const { data: me, isLoading: isLoadingMe } = useGetMemberOfMe();
  const toast = useToast();

  const {
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = formMethods;

  const onSubmit = async (formData: MemberUploadForm) => {
    if (isLoadingMe || isLoadingMemberProfileOfMe) {
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
      allowOfficial,
      mbtiDescription,
      interest,
      idealType,
      activities: activities.map((activity) => {
        if (activity.team === UNSELECTED || activity.team === '') {
          const newActivity: SoptActivity = { ...activity, team: null };
          return newActivity;
        }
        return activity;
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
    };

    const response = await putMemberProfile(requestBody);

    queryClient.invalidateQueries(['getMemberProfileOfMe']);
    queryClient.invalidateQueries(['getMemberProfileById', response.id]);
    queryClient.invalidateQueries(['getMemberProfile']);

    router.push(playgroundLink.memberDetail(response.id));

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
        activities: myProfile.soptActivities.map(({ generation, team, part }) => ({
          generation: `${generation}`,
          part,
          team: team ?? UNSELECTED,
        })),
        allowOfficial: myProfile.allowOfficial,
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
        idealType: myProfile.idealType,
        longIntroduction: myProfile.selfIntroduction,
      });
    }
  }, [myProfile, reset]);

  return (
    <AuthRequired>
      <FormProvider {...formMethods}>
        <MemberForm type='edit' onSubmit={handleSubmit(onSubmit)} isValid={isValid}>
          <BasicFormSection />
          <SoptActivityFormSection />
          <TmiFormSection />
          <Responsive only='desktop'>
            <CareerFormSection header={<MemberFormHeader title='나의 커리어' />} />
          </Responsive>
          <Responsive only='mobile'>
            <FormAccordion title='나의 커리어' description='나의 경력, 스킬 등을 작성해 볼 수 있어요.'>
              <CareerFormSection />
            </FormAccordion>
          </Responsive>
          <PublicQuestionFormSection />
        </MemberForm>
      </FormProvider>
    </AuthRequired>
  );
}

setLayout(MemberEditPage, 'header');
