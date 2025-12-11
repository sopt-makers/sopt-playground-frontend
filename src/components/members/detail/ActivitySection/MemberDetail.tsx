import styled from '@emotion/styled';
import { FC, useMemo } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetMemberProfileById } from '@/api/endpoint_LEGACY/hooks';
import Loading from '@/components/common/Loading';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import CareerSection from '@/components/members/detail/CareerSection';
import DetailInfoSection from '@/components/members/detail/DetailinfoSection';
import GroupSection from '@/components/members/detail/GroupSection';
import InterestSection from '@/components/members/detail/InterestSection';
import MessageSection from '@/components/members/detail/MessageSection';
import ProfileSection from '@/components/members/detail/ProfileSection';
import ProjectSection from '@/components/members/detail/ProjectSection';
import SoptActivitySection from '@/components/members/detail/SoptActivitySection';
import { useRunOnce } from '@/hooks/useRunOnce';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { safeParseInt } from '@/utils';

interface MemberDetailProps {
  memberId: string;
}

const MemberDetail: FC<MemberDetailProps> = ({ memberId }) => {
  const { logPageViewEvent } = useEventLogger();

  const {
    data: profile,
    isLoading,
    error: profileError,
  } = useGetMemberProfileById(safeParseInt(memberId) ?? undefined);

  const { data: me } = useGetMemberOfMe();

  const sortedSoptActivities = useMemo(() => {
    if (!profile?.soptActivities) {
      return [];
    }
    const sorted = [...profile.soptActivities];
    sorted.sort((a, b) => b.generation - a.generation);
    return sorted;
  }, [profile?.soptActivities]);

  useRunOnce(() => {
    if (profile) {
      logPageViewEvent('memberCard', {
        id: Number(memberId),
        name: profile.name,
      });
    }
  }, [profile, memberId]);

  if (isLoading || !profile)
    return (
      <Container>
        <Loading />
      </Container>
    );

  return (
    <Container>
      <Wrapper>
        <ProfileSection profile={profile} memberId={memberId} />
        <MessageSection profile={profile} memberId={memberId} />
        <DetailInfoSection profile={profile} />
        <SoptActivitySection soptActivities={sortedSoptActivities} isMine={profile.isMine} />
        <CareerSection
          careers={profile.careers}
          links={profile.links}
          skill={profile.skill}
          name={profile.name}
          email={profile.email}
          profileImage={profile.profileImage}
          memberId={memberId}
          isMine={profile.isMine}
        />
        {(profile.sojuCapacity !== undefined && profile.sojuCapacity !== null ||
          profile.mbti ||
          profile.interest ||
          profile.selfIntroduction ||
          profile.userFavor?.isSojuLover ||
          profile.userFavor?.isHardPeachLover ||
          profile.userFavor?.isMintChocoLover ||
          profile.userFavor?.isPourSauceLover ||
          profile.userFavor?.isRedBeanFishBreadLover ||
          profile.userFavor?.isRiceTteokLover) && (
          <InterestSection
            sojuCapacity={profile.sojuCapacity}
            mbti={{
              name: profile.mbti,
              description: profile.mbtiDescription,
            }}
            balanceGame={
              profile.userFavor
                ? {
                    isSojuLover: profile.userFavor.isSojuLover,
                    isHardPeachLover: profile.userFavor.isHardPeachLover,
                    isMintChocoLover: profile.userFavor.isMintChocoLover,
                    isPourSauceLover: profile.userFavor.isPourSauceLover,
                    isRedBeanFishBreadLover: profile.userFavor.isRedBeanFishBreadLover,
                    isRiceTteokLover: profile.userFavor.isRiceTteokLover,
                  }
                : null
            }
            interest={profile.interest}
            selfIntroduction={profile.selfIntroduction}
            workPreference={profile.workPreference}
          />
        )}
        <ProjectSection profile={profile} memberId={memberId} meId={me?.id} />
        <GroupSection profile={profile} meId={me?.id} memberId={memberId} />
      </Wrapper>
    </Container>
  );
};

export default MemberDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 0 200px;
  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px 20px;
    padding-bottom: 100px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 790px;
  @media ${MOBILE_MEDIA_QUERY} {
    gap: 24px;
    width: 100%;
  }
`;
