import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import { postMemberProfile } from '@/api/members';
import { ProfileRequest } from '@/api/members/type';
import AuthRequired from '@/components/auth/AuthRequired';
import FormAccordion from '@/components/common/form/FormCollapsible';
import Responsive from '@/components/common/Responsive';
import { MEMBER_DEFAULT_VALUES } from '@/components/members/upload/constants';
import { formatBirthday, getSojuCapacityApiValue } from '@/components/members/upload/format';
import MemberForm from '@/components/members/upload/forms/Form';
import MemberFormHeader from '@/components/members/upload/forms/FormHeader';
import { memberFormSchema } from '@/components/members/upload/schema';
import BasicFormSection from '@/components/members/upload/sections/BasicFormSection';
import CareerFormSection from '@/components/members/upload/sections/CareerFormSection';
import PublicQuestionFormSection from '@/components/members/upload/sections/PublicQuestionFormSection';
import SoptActivityFormSection from '@/components/members/upload/sections/SoptActivityFormSection';
import TmiSection from '@/components/members/upload/sections/TmiSection';
import { MemberUploadForm } from '@/components/members/upload/types';
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
    const { birthday, links, careers, mbti, sojuCapacity, favor, longIntroduction } = formData;
    const requestBody: ProfileRequest = {
      ...formData,
      birthday: formatBirthday(birthday),
      links: links.filter((link) => Object.values(link).every((item) => !!item)),
      careers: careers
        .map((career) => (career.endDate ? career : { ...career, endDate: null }))
        .filter((career) => !Object.values(career).some((item) => item === '')),
      mbti: mbti ? mbti.join('') : mbti,
      sojuCapacity: getSojuCapacityApiValue(sojuCapacity) ?? null,
      userFavor: {
        isPourSauceLover: favor.sweetAndSourPork === '부먹',
        isHardPeachLover: favor.peach === '딱복',
        isMintChocoLover: favor.mintChocolate === '민초',
        isRedBeanFishBreadLover: favor.fishBread === '팥붕',
        isSojuLover: favor.alcohol === '소주',
        isRiceTteokLover: favor.tteokbokki === '쌀떡',
      },
      selfIntroduction: longIntroduction,
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
          <TmiSection />
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

setLayout(MemberUploadPage, 'header');
