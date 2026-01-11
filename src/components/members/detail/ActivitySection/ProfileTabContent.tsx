import { ProfileDetail, SoptActivity } from '@/api/endpoint_LEGACY/members/type';
import CareerSection from '@/components/members/detail/CareerSection';
import DetailInfoSection from '@/components/members/detail/DetailinfoSection';
import GroupSection from '@/components/members/detail/GroupSection';
import InterestSection from '@/components/members/detail/InterestSection';
import MessageSection from '@/components/members/detail/MessageSection';
import ProjectSection from '@/components/members/detail/ProjectSection';
import SoptActivitySection from '@/components/members/detail/SoptActivitySection';

interface ProfileTabContentProps {
  profile: ProfileDetail;
  memberId: string;
  meId?: number;
  sortedSoptActivities: SoptActivity[];
}

const ProfileTabContent = ({ profile, memberId, meId, sortedSoptActivities }: ProfileTabContentProps) => {
  return (
    <>
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
      {((profile.sojuCapacity !== undefined && profile.sojuCapacity !== null) ||
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
      <ProjectSection profile={profile} memberId={memberId} meId={meId} />
      <GroupSection profile={profile} meId={meId} memberId={memberId} />
    </>
  );
};

export default ProfileTabContent;
