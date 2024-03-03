import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetMemberProfileById } from '@/api/endpoint_LEGACY/hooks';
import Loading from '@/components/common/Loading';
import SoptActivitySection from '@/components/members/detail/SoptActivitySection';
import { UNSELECTED } from '@/components/members/upload/constants';
import MemberSoptActivityFormSection from '@/components/members/upload/FormSection/SoptActivity';
import { SoptActivity } from '@/components/members/upload/types';

export default function CheckSoptActivity() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: me } = useGetMemberOfMe();
  const { data: profile, isLoading } = useGetMemberProfileById(me?.id);

  const sortedSoptActivities = (() => {
    if (!profile?.soptActivities) {
      return [];
    }
    const sorted = [...profile.soptActivities];
    sorted.sort((a, b) => b.generation - a.generation);
    return sorted;
  })();

  const formMethods = useForm<{ activities: SoptActivity[] }>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (profile) {
      formMethods.reset({
        activities: profile.soptActivities
          .sort((a, b) => a.generation - b.generation)
          .map(({ generation, team, part }) => ({
            generation: `${generation}기`,
            part,
            team: team ?? UNSELECTED,
          })),
      });
    }
  }, [profile, formMethods]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormProvider {...formMethods}>
      {isEditMode ? (
        <>
          <MemberSoptActivityFormSection isEditable />
          {/* FIXME: 개발 중 수정 모드 전환을 위한 임시 핸들러 */}
          <button onClick={() => setIsEditMode(false)}>수정 완료</button>
        </>
      ) : (
        <>
          <SoptActivitySection soptActivities={sortedSoptActivities} />
          <div>
            <button onClick={() => setIsEditMode(true)}>활동 정보 수정하기</button>
            <button>이대로 등록하기</button>
          </div>
        </>
      )}
    </FormProvider>
  );
}
