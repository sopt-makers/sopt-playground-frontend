import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { usePutMemberActivityCheck } from '@/api/endpoint/members/putMemberActivityCheck';
import { usePutMemberProfileMutation } from '@/api/endpoint/members/putMemberProfile';
import { useGetMemberProfileOfMe } from '@/api/endpoint_LEGACY/hooks';
import Loading from '@/components/common/Loading';
import SoptActivitySection from '@/components/members/detail/SoptActivitySection';
import useRegisterModal from '@/components/members/hooks/useRegisterModal';
import { UNSELECTED } from '@/components/members/upload/constants';
import MemberSoptActivityFormSection from '@/components/members/upload/FormSection/SoptActivity';
import { SoptActivity } from '@/components/members/upload/types';

export default function CheckSoptActivity() {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isClickDisabled, setIsClickDisabled] = useState(false);
  const { data: profile, isLoading } = useGetMemberProfileOfMe();
  const profileUpdate = usePutMemberProfileMutation();
  const activityCheck = usePutMemberActivityCheck();
  const { confirm } = useRegisterModal();

  const sortedSoptActivities = (() => {
    if (!profile?.soptActivities) return [];

    const sorted = [...profile.soptActivities];
    sorted.sort((a, b) => b.generation - a.generation);
    return sorted;
  })();

  const formMethods = useForm<{ activities: SoptActivity[] }>({ mode: 'onChange' });
  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = formMethods;

  useEffect(() => {
    if (profile) {
      formMethods.reset({
        activities: profile.soptActivities
          .sort((a, b) => a.generation - b.generation)
          .map(({ generation, team, part }) => ({
            generation: `${generation}기`,
            part,
            team: team ?? '',
          })),
      });
    }
  }, [profile, formMethods]);

  const registerActivity = async ({ activities }: { activities: SoptActivity[] }) => {
    const result = await confirm({
      title: '활동 정보를 이대로 등록할까요?',
      description:
        '운팀/미팀 활동 내역을 제외한\nSOPT 활동 정보는 추후 수정이 불가능하니\n정확히 입력되었는지 꼼꼼하게 확인해주세요.',
      okButtonText: '등록하기',
      cancelButtonText: '다시 확인하기',
      maxWidth: 403,
    });

    if (result && profile) {
      const data = {
        ...profile,
        activities: activities.map((activity) => {
          const newActivity: SoptActivity = { ...activity, generation: activity.generation.replace(/기/g, '') };
          if (activity.team === UNSELECTED || activity.team === '') {
            return { ...newActivity, team: null };
          }
          return newActivity;
        }),
        workPreference: {
          ideationStyle: null,
          workTime: null,
          communicationStyle: null,
          workPlace: null,
          feedbackStyle: null,
        },
        userFavor:
          profile.userFavor === null
            ? {
                isPourSauceLover: null,
                isHardPeachLover: null,
                isMintChocoLover: null,
                isRedBeanFishBreadLover: null,
                isSojuLover: null,
                isRiceTteokLover: null,
              }
            : profile.userFavor,
      };

      await Promise.all([profileUpdate.mutateAsync(data), activityCheck.mutate({ isCheck: false })]).then(() =>
        router.replace(router.query?.ob ? playgroundLink.memberEdit() : playgroundLink.memberUpload()),
      );
    }
  };

  useEffect(() => {
    handleClickDisabled();
  }, [getValues('activities'), Object.keys(errors).length]);

  const handleClickDisabled = () => {
    const activities = getValues('activities');
    const emptyActivity = activities?.find(({ generation, part }) => generation === '' || part === '');
    const errorCount = Object.keys(errors).length;

    if (emptyActivity !== undefined || errorCount > 0) {
      setIsClickDisabled(true);
      return;
    }
    setIsClickDisabled(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormProvider {...formMethods}>
      <Title>활동 정보 {isEditMode ? '수정' : '확인'}</Title>
      <SubTitle>
        등록된 활동 정보가 정확한지 확인하고, 이외 활동 정보나 운팀/미팀 활동 내역이 있다면 추가로 등록해주세요. <br />*
        31기부터는 임의로 기수와 파트 수정이 불가능해요.
      </SubTitle>
      {isEditMode ? (
        <Bottom>
          <MemberSoptActivityFormSection isEditable isCheckPage={true} handleClickDisabled={handleClickDisabled} />
          <ButtonWrapper>
            <Button type='button' theme='light' onClick={handleSubmit(registerActivity)} disabled={isClickDisabled}>
              수정 완료
            </Button>
          </ButtonWrapper>
        </Bottom>
      ) : (
        <Bottom>
          <SoptActivitySection soptActivities={sortedSoptActivities} />
          <ButtonWrapper>
            <Button type='button' theme='dark' onClick={() => setIsEditMode(true)}>
              활동 정보 수정하기
            </Button>
            <Button type='button' theme='light' onClick={handleSubmit(registerActivity)}>
              이대로 등록하기
            </Button>
          </ButtonWrapper>
        </Bottom>
      )}
    </FormProvider>
  );
}

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Title = styled.div`
  letter-spacing: -0.36px;
  color: ${colors.gray10};
  ${fonts.TITLE_32_SB}
`;

const SubTitle = styled.div`
  margin-bottom: 29px;
  color: var(--gray80, #808388);
  ${fonts.BODY_16_M}
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
`;

const Button = styled.button<{ theme: 'light' | 'dark' }>`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 31px;
  padding: 14px;
  width: 163px;
  height: 42px;
  letter-spacing: -0.14px;
  ${fonts.LABEL_14_SB};

  ${({ theme }) =>
    theme === 'dark' &&
    css`
      border: 1px solid ${colors.gray600};
      background-color: ${colors.gray800};
      color: ${colors.gray10};
    `}

  ${({ theme }) =>
    theme === 'light' &&
    css`
      transition: all 0.35s;
      background-color: ${colors.gray10};
      color: ${colors.gray950};

      &:disabled {
        background-color: ${colors.gray800};
        cursor: not-allowed;
        color: ${colors.gray300};
      }
    `}
`;
