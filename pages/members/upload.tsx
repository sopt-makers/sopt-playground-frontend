import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import { postMemberProfile } from '@/api/members';
import { ProfileRequest } from '@/api/members/type';
import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
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

export default function MemberUploadPage() {
  const formMethods = useForm<MemberUploadForm>({
    defaultValues: MEMBER_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(memberFormSchema),
  });
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const convertEmptyStringToNull = (value: string) => (value.length > 0 ? value : null);
  const formatBirthday = (birthday: Birthday) => {
    birthday.year = birthday.year.length > 0 ? birthday.year : '9999';
    birthday.month = birthday.month.length > 0 ? birthday.month.padStart(2, '0') : '99';
    birthday.day = birthday.day.length > 0 ? birthday.day.padStart(2, '0') : '99';
    return `${birthday.year}-${birthday.month}-${birthday.day}`;
  };
  const onSubmit = async (formData: MemberUploadForm) => {
    if (Object.keys(errors).length) return;
    const { profileImage, birthday, phone, email, university, introduction, major, skill, links, address } = formData;
    const requestBody: ProfileRequest = {
      ...formData,
      profileImage: convertEmptyStringToNull(profileImage),
      birthday: convertEmptyStringToNull(formatBirthday(birthday)),
      phone: convertEmptyStringToNull(phone),
      email: convertEmptyStringToNull(email),
      address: convertEmptyStringToNull(address),
      university: convertEmptyStringToNull(university),
      major: convertEmptyStringToNull(major),
      introduction: convertEmptyStringToNull(introduction),
      skill: convertEmptyStringToNull(skill),
      links: links.filter((link) => link.title && link.url).length ? links : null,
    };
    const response = await postMemberProfile(requestBody);
    router.push(`/members/detail?memberId=${response.id}`);
  };
  return (
    <AuthRequired>
      <FormProvider {...formMethods}>
        <StyledContainer>
          <StyledHeader>
            <div className='title'>프로필 등록</div>
            <div className='description'>SOPT 멤버들을 위한 프로필을 등록해주세요</div>
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
                프로필 등록하기
              </button>
            </div>
          </StyledFooter>
        </StyledContainer>
      </FormProvider>
    </AuthRequired>
  );
}

setLayout(MemberUploadPage, (page) => (
  <>
    <Header />
    {page}
  </>
));

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
    @media (max-width: 790px) {
      width: 100%;
    }
  }
`;
