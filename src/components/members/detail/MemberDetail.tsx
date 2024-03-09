import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import dayjs from 'dayjs';
import { uniq } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CallIcon from 'public/icons/icon-call.svg';
import EditIcon from 'public/icons/icon-edit.svg';
import MailIcon from 'public/icons/icon-mail.svg';
import ProfileIcon from 'public/icons/icon-profile.svg';
import { FC, useMemo } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetMemberProfileById } from '@/api/endpoint_LEGACY/hooks';
import { isProjectCategory } from '@/api/endpoint_LEGACY/projects/type';
import Loading from '@/components/common/Loading';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import CareerSection from '@/components/members/detail/CareerSection';
import EmptyProfile from '@/components/members/detail/EmptyProfile';
import InfoItem from '@/components/members/detail/InfoItem';
import InterestSection from '@/components/members/detail/InterestSection';
import MemberCrewCard from '@/components/members/detail/MemberCrewCard';
import MemberDetailSection from '@/components/members/detail/MemberDetailSection';
import MemberProjectCard from '@/components/members/detail/MemberProjectCard';
import MessageSection from '@/components/members/detail/MessageSection';
import PartItem from '@/components/members/detail/PartItem';
import { DEFAULT_DATE } from '@/components/members/upload/constants';
import { Category } from '@/components/projects/types';
import { playgroundLink } from '@/constants/links';
import { useRunOnce } from '@/hooks/useRunOnce';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { safeParseInt } from '@/utils';

const DUMMY = {
  meetings: [
    {
      id: 91,
      isMeetingLeader: false,
      title: '네네네네네네네네네네네네네네네네네네네네ㅔ네네네네네네네네네',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/12/09/127b44eb-cc90-4b3a-a01c-6d202b781d58.jpeg',
      category: '스터디',
      isActiveMeeting: false,
      mstartDate: '2023-04-11T00:00:00',
      mendDate: '2023-05-27T00:00:00',
    },
    {
      id: 90,
      isMeetingLeader: false,
      title: '\b커피 한잔 할래요 ?',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/10/17/9c185091-7575-48e2-95f2-67f06aea0335.jpeg',
      category: '스터디',
      isActiveMeeting: true,
      mstartDate: '2023-12-10T00:00:00',
      mendDate: '2024-05-10T00:00:00',
    },
    {
      id: 85,
      isMeetingLeader: false,
      title: '주술사되는법',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/10/01/21c6ea54-8965-4ed7-a691-bb0a1e11382c.png',
      category: '스터디',
      isActiveMeeting: true,
      mstartDate: '2023-10-04T00:00:00',
      mendDate: '2024-10-04T00:00:00',
    },
    {
      id: 83,
      isMeetingLeader: false,
      title: 'QA 모임',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/09/28/e604fd62-6b6f-4f48-a5fa-85a1806126c0.png',
      category: '스터디',
      isActiveMeeting: false,
      mstartDate: '2023-01-09T00:00:00',
      mendDate: '2024-01-01T00:00:00',
    },
    {
      id: 82,
      isMeetingLeader: true,
      title: '고기 좋아요',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/09/28/270911ef-e176-4323-b713-b0352a8363a7.jpeg',
      category: '스터디',
      isActiveMeeting: false,
      mstartDate: '2100-01-01T00:00:00',
      mendDate: '2100-01-02T00:00:00',
    },
    {
      id: 67,
      isMeetingLeader: true,
      title: '내가 최고야',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/09/17/bc1d00b7-9770-4cde-ba04-69bbd5a9ae72.png',
      category: '스터디',
      isActiveMeeting: true,
      mstartDate: '2023-09-17T00:00:00',
      mendDate: '9999-12-30T00:00:00',
    },
    {
      id: 13,
      isMeetingLeader: true,
      title: '행사',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/09/17/bc1d00b7-9770-4cde-ba04-69bbd5a9ae72.png',
      category: '행사',
      isActiveMeeting: true,
      mstartDate: '2023-09-17T00:00:00',
      mendDate: '',
    },
  ],
  meta: {
    page: 1,
    take: 6,
    itemCount: 22,
    pageCount: 4,
    hasPreviousPage: false,
    hasNextPage: true,
  },
};

interface MemberDetailProps {
  memberId: string;
}

const convertBirthdayFormat = (birthday?: string) => {
  // FIXME: 서버쪽에 YYYY-MM-DD 형태로 무조건 업로드시 전송해줘야 하는 이슈가 있어서,
  // 생년월일을 보내지 않았을 경우에 DEFAULT_DATE를 전송하도록 임시처리 해 두었습니다. 이를 클라에서 보여주기 위해 대응합니다.
  if (birthday) {
    const isDefaultDay = dayjs(birthday).isSame(dayjs(DEFAULT_DATE));
    return isDefaultDay ? '' : dayjs(birthday).format('YYYY-MM-DD');
  }
  return '';
};

const MemberDetail: FC<MemberDetailProps> = ({ memberId }) => {
  const { logClickEvent, logPageViewEvent } = useEventLogger();
  const router = useRouter();
  const { data: profile, isLoading, error } = useGetMemberProfileById(safeParseInt(memberId) ?? undefined);
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

  if (error?.response?.status === 400) {
    return <EmptyProfile />;
  }

  if (isLoading || !profile)
    return (
      <Container>
        <Loading />
      </Container>
    );

  return (
    <Container>
      <Wrapper>
        <ProfileContainer>
          {profile.profileImage ? (
            <ProfileImage src={profile.profileImage} />
          ) : (
            <EmptyProfileImage>
              <ProfileIcon />
            </EmptyProfileImage>
          )}

          <ProfileContents>
            <div>
              <NameWrapper>
                <div className='name'>{profile.name}</div>
                <div className='part'>{uniq(profile.soptActivities.map(({ part }) => part)).join('/')}</div>
              </NameWrapper>
              <div className='intro'>{profile.introduction}</div>
            </div>
            <ContactWrapper shouldDivide={!!profile.phone && !!profile.email}>
              {profile.phone && (
                <Link passHref href={`tel:${profile.phone}`} legacyBehavior>
                  <div style={{ cursor: 'pointer' }}>
                    <CallIcon />
                    <div className='phone'>{profile.phone}</div>
                  </div>
                </Link>
              )}
              {profile.email && (
                <Link passHref href={`mailto:${profile.email}`} legacyBehavior>
                  <div style={{ cursor: 'pointer' }}>
                    <MailIcon />
                    <div className='email'>{profile.email}</div>
                  </div>
                </Link>
              )}
            </ContactWrapper>
          </ProfileContents>

          {profile.isMine && (
            <EditButton
              onClick={() => {
                router.push(playgroundLink.memberEdit());
                logClickEvent('editProfile');
              }}
            >
              <EditIcon />
            </EditButton>
          )}
        </ProfileContainer>

        {!profile.isMine && (
          <>
            <MessageSection
              name={profile.name}
              email={profile.email}
              profileImage={profile.profileImage}
              memberId={memberId}
            />
          </>
        )}

        {(profile.birthday || profile.address || profile.university || profile.address) && (
          <MemberDetailSection style={{ gap: '30px' }}>
            {profile.birthday && <InfoItem label='생년월일' content={convertBirthdayFormat(profile.birthday)} />}
            {profile.university && <InfoItem label='학교'>{profile.university}</InfoItem>}
            {profile.major && <InfoItem label='전공'>{profile.major}</InfoItem>}
            {profile.address && (
              <InfoItem label='활동 지역'>
                <StyledAddressBadgeWrapper>
                  {profile.address.split(',').map((address) => (
                    <AddressBadge key={address}>{address}</AddressBadge>
                  ))}
                </StyledAddressBadgeWrapper>
              </InfoItem>
            )}
          </MemberDetailSection>
        )}

        <MemberDetailSection style={{ gap: '34px' }}>
          {sortedSoptActivities.map(({ generation, part, projects, team }, idx) => (
            <PartItem
              key={idx}
              generation={`${generation}`}
              part={part}
              activities={projects.map((project) => ({
                name: project.name,
                type: convertProjectType(project.category) ?? '',
                href: playgroundLink.projectDetail(project.id),
              }))}
              teams={team !== null ? [team] : []}
            />
          ))}
        </MemberDetailSection>

        {(profile.sojuCapacity ||
          profile.mbti ||
          profile.idealType ||
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
            idealType={profile.idealType}
            interest={profile.interest}
            selfIntroduction={profile.selfIntroduction}
          />
        )}

        {(profile.careers?.length > 0 || profile.skill || profile.links?.length > 0) && (
          <CareerSection careers={profile.careers} links={profile.links} skill={profile.skill} />
        )}

        <ActivityContainer>
          <ActivityTitle>{profile.name}님이 참여한 프로젝트</ActivityTitle>
          {profile.projects.length > 0 && (
            <>
              <ActivitySub>{profile.projects.length}개의 프로젝트에 참여</ActivitySub>
              <ActivityDisplay>
                {profile.projects.map((project) => (
                  <MemberProjectCard key={project.id} {...project} />
                ))}
              </ActivityDisplay>
            </>
          )}
          {profile.projects.length === 0 && (
            <>
              <ActivitySub>아직 참여한 프로젝트가 없어요</ActivitySub>
              {String(me?.id) === memberId && (
                <ProjectUploadNudge>
                  <Text typography='SUIT_14_M' style={{ textAlign: 'center', lineHeight: '24px' }}>
                    참여한 프로젝트를 등록하면 <br />
                    공식 홈페이지에도 프로젝트가 업로드 돼요!
                  </Text>
                  <ProjectUploadButton
                    onClick={() =>
                      logClickEvent('projectUpload', {
                        referral: 'myPage',
                      })
                    }
                    href={playgroundLink.projectUpload()}
                  >
                    + 내 프로젝트 올리기
                  </ProjectUploadButton>
                  <ProjectUploadMaskImg src='/icons/img/project-mask.png' alt='project-mask-image' />
                </ProjectUploadNudge>
              )}
            </>
          )}
        </ActivityContainer>
        <ActivityContainer>
          <ActivityTitle>{profile.name}님이 참여한 모임</ActivityTitle>
          {DUMMY.meetings.length > 0 && (
            <>
              <ActivitySub>{DUMMY.meetings.length}개의 모임에 참여</ActivitySub>
              <ActivityDisplay>
                {DUMMY.meetings.map((meeting) => (
                  <MemberCrewCard key={meeting.id} {...meeting} userName={profile.name} />
                ))}
              </ActivityDisplay>
            </>
          )}
        </ActivityContainer>
      </Wrapper>
    </Container>
  );
};

function convertProjectType(typeCode: Category) {
  if (!isProjectCategory(typeCode)) throw new Error('project category type error');

  switch (typeCode) {
    case 'APPJAM':
      return '앱잼';
    case 'ETC':
      return '사이드 프로젝트';
    case 'JOINTSEMINAR':
      return '합동 세미나';
    case 'SOPKATHON':
      return '솝커톤';
    case 'SOPTERM':
      return '솝텀 프로젝트';
    case 'STUDY':
      return '스터디';
    default:
      const exhaustiveCheck: never = typeCode;
      throw new Error(`project category ${exhaustiveCheck} type error`);
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 123px 0;
  @media ${MOBILE_MEDIA_QUERY} {
    padding: 12px 20px;
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

const ProfileContainer = styled.div`
  display: flex;
  position: relative;
  gap: 33px;
  align-items: center;
  width: 100%;
  letter-spacing: -0.01em;
  font-weight: 500;
  @media ${MOBILE_MEDIA_QUERY} {
    align-items: flex-start;
  }
`;

const EmptyProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 36px;
  background: ${colors.gray700};
  width: 171px;
  height: 171px;
`;

const ProfileImage = styled.img`
  border-radius: 36px;
  width: 171px;
  height: 171px;
  object-fit: cover;
  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 20px;
    width: 88px;
    height: 88px;
  }
`;

const ProfileContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 128px;

  .intro {
    margin-top: 15px;
    line-height: 100%;
    color: #c0c5c9;
    font-size: 18px;
    @media ${MOBILE_MEDIA_QUERY} {
      margin-top: 14px;
      font-size: 14px;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    height: auto;
  }
`;

const EditButton = styled.div`
  display: flex;
  position: absolute;
  top: 22px;
  right: 0;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #2c2d2e;
  cursor: pointer;
  width: 40px;
  height: 40px;

  svg {
    width: 26.05px;
    height: auto;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    top: -12px;
    width: 32px;
    height: 32px;

    svg {
      width: 19.26px;
    }
  }
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;

  .name {
    line-height: 100%;
    white-space: nowrap;
    font-size: 36px;
    font-weight: 700;
    @media ${MOBILE_MEDIA_QUERY} {
      font-size: 24px;
    }
  }

  .part {
    line-height: 100%;
    color: #808388;
    font-size: 16px;
    @media ${MOBILE_MEDIA_QUERY} {
      font-size: 14px;
    }
  }
`;

const ContactWrapper = styled.div<{ shouldDivide: boolean }>`
  display: flex;
  line-height: 100%;
  color: #808388;
  font-size: 14px;

  & > div {
    display: flex;
    gap: 4px;
    align-items: center;
    @media ${MOBILE_MEDIA_QUERY} {
      gap: 7;
    }
  }

  .phone {
    box-sizing: border-box;
    margin-right: 13px;
    border-right: ${({ shouldDivide }) => (shouldDivide ? '1.5px solid #3c3d40' : 'none')};
    padding-right: 17px;
    @media ${MOBILE_MEDIA_QUERY} {
      margin: 0;
      border: 0;
      padding: 0;
    }
  }

  svg {
    width: 20px;
    height: auto;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 4px;
    margin-top: 28px;
  }
`;

const StyledAddressBadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 10px;
  }
`;

const AddressBadge = styled.div`
  border-radius: 13px;
  background-color: ${colors.gray700};
  padding: 6px 14px;
  line-height: 16px;
  color: ${colors.gray10};

  ${textStyles.SUIT_14_M};
`;

const ActivityContainer = styled.div`
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

const ActivitySub = styled.div`
  margin-top: 18px;
  line-height: 100%;
  color: #989ba0;
  font-size: 22px;
  font-weight: 500;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 10px;
    font-size: 14px;
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

const ProjectUploadNudge = styled.div`
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

const ProjectUploadMaskImg = styled.img`
  position: absolute;
  max-height: 317px;
  object-fit: cover;

  @media ${MOBILE_MEDIA_QUERY} {
    top: 0;
    max-height: 134px;
  }
`;

const ProjectUploadButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin-top: 24px;
  border-radius: 14px;
  background-color: ${colors.gray10};
  padding: 14px 48px;
  color: ${colors.gray800};

  ${textStyles.SUIT_15_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 50px;
    width: 100%;
  }
`;

export default MemberDetail;
