import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
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
import PublicQuestionFormSection from '@/components/members/upload/PublicQuestionFormSection';
import { memberFormSchema } from '@/components/members/upload/schema';
import SoptActivityFormSection from '@/components/members/upload/SoptActivityFormSection';
import { Birthday, MemberUploadForm } from '@/components/members/upload/types';
import { playgroundLink } from '@/constants/links';
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
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;
  const router = useRouter();
  const queryClient = useQueryClient();

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
        activities: data.activities.map((act) => ({
          generation: act.cardinalInfo.split(',')[0],
          part: act.cardinalInfo.split(',')[1],
          team: act.cardinalActivities[0].team,
        })),
        allowOfficial: data.allowOfficial,
        profileImage: data.profileImage,
        careers: data.careers.map((career) => ({
          ...career,
          endDate: career.endDate ?? '',
        })),
      });
    },
  });

  const formatBirthday = (birthday: Birthday) => {
    const { year, month, day } = birthday;
    const parsedBirthDay = dayjs(`${year}-${month}-${day}`);
    return parsedBirthDay.isValid() ? parsedBirthDay.format('YYYY-MM-DD') : '';
  };

  const onSubmit = async (formData: MemberUploadForm) => {
    if (Object.keys(errors).length) return;
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
        <StyledContainer>
          <StyledHeader>
            <div className='title'>프로필 수정</div>
            <div className='description'>SOPT 멤버들을 위한 프로필을 수정해주세요</div>
          </StyledHeader>
          <StyledForm onSubmit={(e) => e.preventDefault()}>
            <BasicFormSection />
            <SoptActivityFormSection />
            <CareerFormSection />
            <AdditionalFormSection />
            <PublicQuestionFormSection />
            <MobileSubmitButton onClick={handleSubmit(onSubmit)} className='mobile-only'>
              완료
            </MobileSubmitButton>
          </StyledForm>
          <StyledFooter className='pc-only'>
            <div className='button-wrapper'>
              <button onClick={handleSubmit(onSubmit)} className='submit'>
                프로필 수정하기
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
