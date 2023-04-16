import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { uniq } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CallIcon from 'public/icons/icon-call.svg';
import EditIcon from 'public/icons/icon-edit.svg';
import LinkIcon from 'public/icons/icon-link.svg';
import MailIcon from 'public/icons/icon-mail.svg';
import ProfileIcon from 'public/icons/icon-profile.svg';
import { FC, useMemo } from 'react';

import { useGetMemberProfileById } from '@/api/hooks';
import Loading from '@/components/common/Loading';
import useModalState from '@/components/common/Modal/useModalState';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import CareerItem from '@/components/members/detail/CareerItem';
import EmptyProfile from '@/components/members/detail/EmptyProfile';
import InfoItem from '@/components/members/detail/InfoItem';
import MemberProjectCard from '@/components/members/detail/MemberProjectCard';
import PartItem from '@/components/members/detail/PartItem';
import CoffeeChatModal from '@/components/members/main/MemberDetail/CoffeeChatModal';
import InterestSection from '@/components/members/main/MemberDetail/InterestSection';
import { DEFAULT_DATE } from '@/components/members/upload/constants';
import { playgroundLink } from '@/constants/links';
import { useRunOnce } from '@/hooks/useRunOnce';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { safeParseInt } from '@/utils';

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
  const { logClickEvent } = useEventLogger();
  const router = useRouter();
  const {
    isOpen: isOpenCoffeeChatModal,
    onOpen: onOpenCoffeeChatModal,
    onClose: onCloseCoffeeChatModal,
  } = useModalState();
  const { data: profile, isLoading, error } = useGetMemberProfileById(safeParseInt(memberId) ?? undefined);
  const { logPageViewEvent } = useEventLogger();

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
          {profile?.profileImage ? (
            <ProfileImage src={profile.profileImage} />
          ) : (
            <EmptyProfileImage>
              <ProfileIcon />
            </EmptyProfileImage>
          )}

          <ProfileContents>
            <div>
              <NameWrapper>
                <div className='name'>{profile?.name}</div>
                <div className='part'>{uniq(profile?.soptActivities.map(({ part }) => part)).join('/')}</div>
              </NameWrapper>
              <div className='intro'>{profile?.introduction}</div>
            </div>
            <ContactWrapper shouldDivide={!!profile?.phone && !!profile?.email}>
              {profile.phone && (
                <Link passHref href={`tel:${profile?.phone}`} legacyBehavior>
                  <div style={{ cursor: 'pointer' }}>
                    <CallIcon />
                    <div className='phone'>{profile?.phone}</div>
                  </div>
                </Link>
              )}
              {profile.email && (
                <Link passHref href={`mailto:${profile?.email}`} legacyBehavior>
                  <div style={{ cursor: 'pointer' }}>
                    <MailIcon />
                    <div className='email'>{profile?.email}</div>
                  </div>
                </Link>
              )}
            </ContactWrapper>
          </ProfileContents>

          {profile.isMine && (
            <EditButton
              onClick={() => {
                router.push(playgroundLink.memberEdit());
                logClickEvent('editProfile', {});
              }}
            >
              <EditIcon />
            </EditButton>
          )}
        </ProfileContainer>

        {!profile.isMine && profile.email && (
          <>
            <AskContainer>
              <div>
                <AskTitle>{profile.name}에게 하고 싶은 질문이 있나요?</AskTitle>
                <AskSubtitle>“저에게 궁금한게 있다면 편하게 남겨주세요~”</AskSubtitle>
              </div>
              <AskButton onClick={onOpenCoffeeChatModal}>쪽지 보내기</AskButton>
            </AskContainer>
            {isOpenCoffeeChatModal && (
              <CoffeeChatModal
                receiverId={memberId}
                name={profile.name ?? ''}
                profile={
                  <>
                    {profile.profileImage ? (
                      <ProfileImage
                        src={profile.profileImage}
                        style={{ width: '84px', height: '84px', borderRadius: '20px' }}
                      />
                    ) : (
                      <EmptyProfileImage style={{ width: '84px', height: '84px' }}>
                        <ProfileIcon />
                      </EmptyProfileImage>
                    )}
                  </>
                }
                onClose={onCloseCoffeeChatModal}
              />
            )}
          </>
        )}
        {(profile.birthday || profile.address || profile.university || profile.address) && (
          <InfoContainer style={{ gap: '30px' }}>
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
          </InfoContainer>
        )}

        <InfoContainer style={{ gap: '34px' }}>
          {sortedSoptActivities.map(({ generation, part, projects, team }, idx) => (
            <PartItem
              key={idx}
              generation={`${generation}`}
              part={part}
              activities={projects.map((project) => ({
                name: project.name,
                type: convertProjectType(project.category),
                href: playgroundLink.projectDetail(project.id),
              }))}
              teams={team !== null ? [team] : []}
            />
          ))}
        </InfoContainer>

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
          <InfoContainer>
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
          </InfoContainer>
        )}

        {profile.careers && profile.careers.length > 0 && (
          <InfoContainer style={{ gap: '20px' }}>
            {profile.careers.map((career, idx) => (
              <CareerItem key={idx} career={career} />
            ))}
          </InfoContainer>
        )}

        {(profile.skill || (profile.links && profile.links.length > 0)) && (
          <InfoContainer style={{ gap: '30px' }}>
            {profile.skill && <InfoItem label='스킬' content={profile.skill ?? ''} />}
            {profile.links.length > 0 && (
              <InfoItem
                label='링크'
                content={
                  <LinkItems>
                    {profile.links.map((item, idx) => (
                      <Link passHref href={item.url} key={idx} target='_blank'>
                        <LinkIcon />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </LinkItems>
                }
              />
            )}
          </InfoContainer>
        )}

        <ProjectContainer>
          <ProjectTitle>{profile.name}님이 참여한 프로젝트</ProjectTitle>
          <ProjectSub>{profile.projects.length}개의 프로젝트에 참여</ProjectSub>
          <ProjectDisplay>
            {profile.projects.map((project) => (
              <MemberProjectCard key={project.id} {...project} />
            ))}
          </ProjectDisplay>
        </ProjectContainer>
      </Wrapper>
    </Container>
  );
};

function convertProjectType(typeCode: 'APPJAM' | 'SOPKATHON' | null) {
  if (typeCode === 'APPJAM') {
    return '앱잼';
  }
  if (typeCode === 'SOPKATHON') {
    return '솝커톤';
  }

  return '';
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
  background: ${colors.black60};
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
  background: ${colors.black40};
  padding: 6px 14px;
  color: ${colors.white};
  ${textStyles.SUIT_14_M};
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  background: #1c1d1e;
  padding: 40px;
  width: 100%;
  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 18px;
    padding: 30px 20px;
  }
`;

const AskContainer = styled(InfoContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 36px;
  padding-bottom: 36px;
  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 24px;
  }
`;

const AskTitle = styled.div`
  color: ${colors.white100};
  ${textStyles.SUIT_18_SB}
  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_SB}
  }
`;

const AskSubtitle = styled.div`
  margin-top: 12px;
  color: ${colors.gray60};
  ${textStyles.SUIT_16_M}
  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }
`;

const AskButton = styled.div`
  border-radius: 14px;
  background-color: ${colors.purple100};
  cursor: pointer;
  padding: 15px 36px;
  color: ${colors.white100};
  ${textStyles.SUIT_15_SB}
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 34px;
    padding: 15px;
    width: 100%;
    text-align: center;
    ${textStyles.SUIT_16_SB}
  }
`;

const LinkItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > a {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    @media ${MOBILE_MEDIA_QUERY} {
      gap: 6px;

      span {
        box-sizing: border-box;
        border-bottom: 1.5px solid #3c3d40;
        padding: 5px 0;
      }
    }
  }

  svg {
    width: 26px;
    height: auto;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 21px;
  }
`;

const ProjectContainer = styled.div`
  margin-top: 110px;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 80px;
  }
`;

const ProjectTitle = styled.div`
  line-height: 100%;
  font-size: 32px;
  font-weight: 700;
  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 22px;
  }
`;

const ProjectSub = styled.div`
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

const ProjectDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 29px;
  margin-top: 60px;
  row-gap: 64px;
  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    flex-direction: column;
    gap: 26px;
    margin-top: 26px;
  }
`;

export default MemberDetail;
