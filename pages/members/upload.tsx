import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { postMemberProfile } from '@/api/members';
import { ProfileRequest } from '@/api/members/type';
import { useGetMemberOfMe, useGetMemberProfileById, useGetMemberProfileOfMe } from '@/apiHooks/members';
import AuthRequired from '@/components/auth/AuthRequired';
import useStringRouterQuery from '@/components/auth/useStringRouterQuery';
import HeaderLayout from '@/components/layout/HeaderLayout';
import AdditionalFormSection from '@/components/members/upload/AdditionalInfoFormSection';
import BasicFormSection from '@/components/members/upload/BasicFormSection';
import { MEMBER_DEFAULT_VALUES } from '@/components/members/upload/constants';
import PublicQuestionFormSection from '@/components/members/upload/PublicQuestionFormSection';
import { memberFormSchema } from '@/components/members/upload/schema';
import SoptActivityFormSection from '@/components/members/upload/SoptActivityFormSection';
import { Birthday, MemberUploadForm } from '@/components/members/upload/types';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { setLayout } from '@/utils/layout';

export const DEFAULT_DATE = '1970-01-01';

export default function MemberUploadPage() {
  const formMethods = useForm<MemberUploadForm>({
    defaultValues: MEMBER_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(memberFormSchema),
  });

  const router = useRouter();
  const { query } = useStringRouterQuery(['edit'] as const);
  const { data: myProfile, refetch: refetchMyProfile } = useGetMemberProfileOfMe();
  const { data: me, refetch: refetchMe } = useGetMemberOfMe();
  const { refetch: refetchProfileById } = useGetMemberProfileById(me?.id);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = formMethods;

  const isEditPage = query?.edit === 'true' ? true : false;
  const uploadType = isEditPage ? '수정' : '등록';

  useEffect(() => {
    if (isEditPage && myProfile) {
      setValue('name', myProfile.name);
      setValue('birthday', {
        year: Number(myProfile.birthday.split('-')[0]).toString(),
        month: Number(myProfile.birthday.split('-')[1]).toString(),
        day: Number(myProfile.birthday.split('-')[2]).toString(),
      });
      setValue('phone', myProfile.phone);
      setValue('email', myProfile.email);
      setValue('address', myProfile.address);
      setValue('university', myProfile.university);
      setValue('major', myProfile.major);
      setValue('introduction', myProfile.introduction);
      setValue('skill', myProfile.skill);
      setValue('links', myProfile.links);
      setValue('openToWork', myProfile.openToWork);
      setValue('openToSideProject', myProfile.openToSideProject);
      setValue(
        'activities',
        myProfile.activities.map((act) => ({
          generation: act.cardinalInfo.split(',')[0],
          part: act.cardinalInfo.split(',')[1],
          team: act.cardinalActivities[0].team,
        })),
      );
      setValue('allowOfficial', myProfile.allowOfficial);
      setValue('profileImage', myProfile.profileImage);
    }
  }, [isEditPage, myProfile, setValue]);

  const formatBirthday = (birthday: Birthday) => {
    const { year, month, day } = birthday;
    const parsedBirthDay = dayjs(`${year}-${month}-${day}`);
    return (parsedBirthDay.isValid() ? parsedBirthDay : dayjs(DEFAULT_DATE)).format('YYYY-MM-DD');
  };
  const onSubmit = async (formData: MemberUploadForm) => {
    // if (Object.keys(errors).length) return;
    const { birthday, links } = formData;
    const requestBody: ProfileRequest = {
      ...formData,
      birthday: formatBirthday(birthday),
      links: links.filter((link) => Object.values(link).every((item) => !!item)),
    };
    const response = await postMemberProfile(requestBody);
    await Promise.all([refetchMyProfile(), refetchProfileById(), refetchMe()]);

    router.push(`/members/detail?memberId=${response.id}`);
  };

  return (
    <AuthRequired>
      <FormProvider {...formMethods}>
        <StyledContainer>
          <StyledHeader>
            <div className='title'>프로필 {uploadType}</div>
            <div className='description'>SOPT 멤버들을 위한 프로필을 {uploadType}해주세요</div>
          </StyledHeader>
          <StyledForm onSubmit={(e) => e.preventDefault()}>
            <BasicFormSection />
            <SoptActivityFormSection />
            <AdditionalFormSection />
            <PublicQuestionFormSection />
            <MobileSubmitButton onClick={handleSubmit(onSubmit)} className='mobile-only'>
              완료
            </MobileSubmitButton>
          </StyledForm>
          <StyledFooter className='pc-only'>
            <div className='button-wrapper'>
              <button onClick={handleSubmit(onSubmit)} className='submit'>
                프로필 {uploadType}하기
              </button>
            </div>
          </StyledFooter>
        </StyledContainer>
      </FormProvider>
    </AuthRequired>
  );
}

setLayout(MemberUploadPage, 'header');

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding-bottom: 375px;

  & > * {
    width: 790px;
    @media (max-width: 790px) {
      width: 100%;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding-bottom: 0;
  }
`;

const StyledHeader = styled.header`
  margin-top: 142px;

  .title {
    color: #fcfcfc;
    font-size: 36px;
    font-weight: 700;

    @media ${MOBILE_MEDIA_QUERY} {
      margin-top: 36px;
      margin-left: 24px;
      font-size: 24px;
    }
  }

  .description {
    margin-top: 16px;
    color: ${colors.gray100};
    font-size: 16px;
    font-weight: 500;

    @media ${MOBILE_MEDIA_QUERY} {
      margin-top: 12px;
      margin-left: 24px;
      font-size: 14px;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 36px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 50px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 70px;
    margin-top: 52px;
    padding: 0 20px 48px;
  }
`;

const MobileSubmitButton = styled.button`
  margin-top: 18px;
  border-radius: 12px;
  background-color: ${colors.purple100};
  padding: 18px 0;
  color: ${colors.white100};
  font-size: 16px;
  font-weight: 600;
`;

const StyledFooter = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: ${colors.black80};
  width: 100vw;
  height: 90px;

  .submit {
    border-radius: 100px;
    background-color: ${colors.purple100};
    padding: 18px 50px;

    ${textStyles.SUIT_14_M}
  }

  .button-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 790px;

    button {
      cursor: pointer;
    }

    @media (max-width: 790px) {
      width: 100%;
    }
  }
`;
