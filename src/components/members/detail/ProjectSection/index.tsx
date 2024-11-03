import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Link from 'next/link';
import { playgroundLink } from 'playground-common/export';

import { ProfileDetail } from '@/api/endpoint_LEGACY/members/type';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import MemberProjectCard from '@/components/members/detail/ActivitySection/MemberProjectCard';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ProjectActivitySectionProps {
  profile: ProfileDetail;
  memberId: string;
  meId?: number | undefined;
}

const ProjectSection = ({ profile, memberId, meId }: ProjectActivitySectionProps) => {
  const { logClickEvent } = useEventLogger();

  return (
    <Container>
      {profile.projects.length > 0 ? (
        <>
          <ActivityTitle>
            {profile.name}님이 참여한 {profile.projects.length}개의 프로젝트예요!
          </ActivityTitle>
          <ActivityDisplay>
            {profile.projects.map((project) => (
              <MemberProjectCard key={project.id} {...project} />
            ))}
          </ActivityDisplay>
        </>
      ) : (
        <>
          {String(meId) === memberId ? (
            <>
              <ActivityTitle>아직 등록한 프로젝트가 없어요</ActivityTitle>
              <ActivityUploadNudge>
                <NudgeSubText typography='SUIT_16_M' style={{ textAlign: 'center', lineHeight: '24px' }}>
                  참여한 프로젝트를 등록하면 <br />
                  공식 홈페이지에도 프로젝트가 업로드 돼요!
                </NudgeSubText>
                <ActivityUploadButton
                  onClick={() => logClickEvent('projectUpload', { referral: 'myPage' })}
                  href={playgroundLink.projectUpload()}
                >
                  <Text typography='SUIT_15_SB'>+ 내 프로젝트 올리기</Text>
                </ActivityUploadButton>
                <ActivityUploadMaskImg src='/icons/img/project-mask.png' alt='project-mask-image' height={317} />
              </ActivityUploadNudge>
            </>
          ) : (
            <ActivityTitle>아직 {profile.name}님이 참여한 프로젝트가 없어요</ActivityTitle>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.section`
  margin-top: 80px;
`;

const ActivityTitle = styled.div`
  line-height: 100%;
  font-size: 32px;
  font-weight: 700;
  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 22px;
  }
`;

const ActivityDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(10px, 1fr));
  row-gap: 20px;
  column-gap: 29px;
  margin-top: 32px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
  }
`;

const ActivityUploadNudge = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  border-radius: 30px;
  background-color: ${colors.gray800};
  height: 317px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 20px;
    height: 212px;
  }
`;

const ActivityUploadMaskImg = styled(ResizedImage)`
  position: absolute;
  max-height: 317px;
  object-fit: cover;

  @media ${MOBILE_MEDIA_QUERY} {
    top: 0;
    max-height: 134px;
  }
`;

const ActivityUploadButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin-top: 24px;
  border-radius: 14px;
  background-color: ${colors.gray10};
  padding: 14px 48px;
  color: ${colors.gray800};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 50px;
    width: 100%;
  }
`;

const NudgeSubText = styled(Text)`
  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 14px;
  }
`;

export default ProjectSection;
