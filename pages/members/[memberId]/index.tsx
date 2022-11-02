import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CallIcon from 'public/icons/icon-call.svg';
import EditIcon from 'public/icons/icon-edit.svg';
import LinkIcon from 'public/icons/icon-link.svg';
import MailIcon from 'public/icons/icon-mail.svg';
import { FC } from 'react';

import { useGetMemberProfileById } from '@/apiHooks/members';
import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import MobileHeader from '@/components/common/MobileHeader';
import InfoItem from '@/components/users/detail/InfoItem';
import PartItem from '@/components/users/detail/PartItem';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const UserDetailPage: FC = () => {
  const router = useRouter();
  const { memberId = 4 } = router.query;
  console.log(memberId);

  const { data: profile, status } = useGetMemberProfileById(Number(memberId));
  if (status === 'error') {
    router.replace('/members/upload');
  }

  const isMyProfile = profile?.isMine ?? false;

  return (
    <AuthRequired>
      <MobileHeader />
      <Container>
        <Wrapper>
          <ProfileContainer>
            <ProfileImage src={profile?.profileImage} />
            <ProfileContents>
              <div>
                <NameWrapper>
                  <div className='name'>{profile?.name}</div>
                  <div className='part'>{profile?.major}</div>
                </NameWrapper>
                <div className='intro'>{profile?.introduction}</div>
              </div>
              <ContactWrapper>
                <Link passHref href={`tel:${profile?.email}`}>
                  <div style={{ cursor: 'pointer' }}>
                    <CallIcon />
                    <div className='phone'>{profile?.phone}</div>
                  </div>
                </Link>
                <Link passHref href={`mailto:${profile?.email}`}>
                  <div style={{ cursor: 'pointer' }}>
                    <MailIcon />
                    <div className='email'>{profile?.email}</div>
                  </div>
                </Link>
              </ContactWrapper>
            </ProfileContents>

            <EditButton>
              <EditIcon />
            </EditButton>
          </ProfileContainer>

          <InfoContainer style={{ gap: '30px' }}>
            <InfoItem label='생년월일' content={dayjs(profile?.birthday).format('YYYY-MM-DD')} />
            <InfoItem label='사는 지역' content={profile?.address ?? ''} />
            <InfoItem label='학교 / 전공' content={profile?.major ?? ''} />
          </InfoContainer>

          <InfoContainer style={{ gap: '34px' }}>
            {profile?.activities.map((item, idx) => {
              const a = item.cardinalInfo.split(',');
              console.log('a', a);
              const [generation, part] = item.cardinalInfo.split(',');
              return (
                <PartItem
                  key={idx}
                  generation={generation}
                  part={part}
                  cardinalActivities={item.cardinalActivities.filter((act) => act.generation.toString() === generation)}
                />
              );
            })}
          </InfoContainer>

          <InfoContainer style={{ gap: '30px' }}>
            <InfoItem label='스킬' content={profile?.skill ?? ''} />
            <InfoItem
              label='링크'
              content={
                <LinkItems>
                  {profile?.links.map((item, idx) => (
                    <Link passHref href={item.url} key={idx}>
                      <div>
                        <LinkIcon />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  ))}
                </LinkItems>
              }
            />
          </InfoContainer>

          <ProjectContainer>
            <ProjectTitle>{profile?.name}님이 참여한 프로젝트</ProjectTitle>
            <ProjectSub>{profile?.projects.length}개의 프로젝트에 참여</ProjectSub>
            <ProjectDisplay>
              {/* {profile?.projects.map((project) => (
                <UserProjectCard
                  key={project.id}
                  category={project.category}
                  summary={project.summary}
                  generation={project.generation}
                  logoImage={project.logo_image}
                  name={project.name}
                  serviceType={project.service_type}
                  thumbnailImage={project.thumbnail_image}
                />
              ))} */}
            </ProjectDisplay>
          </ProjectContainer>
        </Wrapper>
      </Container>
    </AuthRequired>
  );
};

setLayout(UserDetailPage, (page) => (
  <>
    <Header />
    {page}
  </>
));

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

const ProfileImage = styled.img`
  border-radius: 36px;
  background: #2c2d2e;
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

const ContactWrapper = styled.div`
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
    border-right: 1.5px solid #3c3d40;
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

const LinkItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > div {
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

export default UserDetailPage;
