import styled from '@emotion/styled';
import dayjs from 'dayjs';
import uniq from 'lodash/uniq';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CallIcon from 'public/icons/icon-call.svg';
import EditIcon from 'public/icons/icon-edit.svg';
import LinkIcon from 'public/icons/icon-link.svg';
import MailIcon from 'public/icons/icon-mail.svg';
import ProfileIcon from 'public/icons/icon-profile.svg';
import { FC } from 'react';

import { useGetMemberProfileById } from '@/apiHooks/members';
import AuthRequired from '@/components/auth/AuthRequired';
import useStringRouterQuery from '@/components/auth/useStringRouterQuery';
import Header from '@/components/common/Header';
import MobileHeader from '@/components/common/MobileHeader';
import InfoItem from '@/components/users/detail/InfoItem';
import PartItem from '@/components/users/detail/PartItem';
import { DEFAULT_DATE } from '@/pages/members/upload';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { safeParseInt } from '@/utils';
import { setLayout } from '@/utils/layout';

const convertBirthdayFormat = (birthday?: string) => {
  // FIXME: 서버쪽에 YYYY-MM-DD 형태로 무조건 업로드시 전송해줘야 하는 이슈가 있어서,
  // 생년월일을 보내지 않았을 경우에 DEFAULT_DATE를 전송하도록 임시처리 해 두었습니다. 이를 클라에서 보여주기 위해 대응합니다.
  if (birthday) {
    const isDefaultDay = dayjs(birthday).isSame(dayjs(DEFAULT_DATE));
    return isDefaultDay ? '' : dayjs(birthday).format('YYYY-MM-DD');
  }
  return '';
};

const UserDetailPage: FC = () => {
  const router = useRouter();

  const { query, status } = useStringRouterQuery(['memberId'] as const);
  const { data: profile } = useGetMemberProfileById(
    status === 'success' ? safeParseInt(query.memberId) ?? undefined : undefined,
  );

  const is이정연 = profile?.name === '이정연';
  const is김나연 = profile?.name === '김나연';

  const handleAskToMeClick = () => {
    if (profile == null) return;

    if (is이정연) {
      window.open('https://forms.gle/scjKJFpc4sszuGgp9', '_blank');
      return;
    }

    if (is김나연) {
      window.open('https://forms.gle/s5Kkc7GxxsEBYh4U8', '_blank');
      return;
    }

    alert('준비 중인 기능이에요!');
  };

  return (
    <AuthRequired>
      <MobileHeader />
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
                  <div className='part'>
                    {uniq(
                      profile?.activities.map((item) => {
                        const [_, part] = item.cardinalInfo.split(',');
                        return part;
                      }),
                    )
                      .filter((part) => part.length)
                      .join('/')}
                  </div>
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

            {profile?.isMine && (
              <EditButton onClick={() => router.push(`/members/upload?edit=true`)}>
                <EditIcon />
              </EditButton>
            )}
          </ProfileContainer>

          {!profile?.isMine && (
            <AskContainer>
              {is김나연 ? (
                <div>
                  <AskTitle>기획/PM 직무, 취업에 대해 궁금하신가요?</AskTitle>
                  <AskSubtitle>궁금한 점을 편하게 남겨주세요~!</AskSubtitle>
                </div>
              ) : is이정연 ? (
                <div>
                  <AskTitle>31기 기획파트 여러분 안녕하세요!</AskTitle>
                  <AskSubtitle>제품 구현 또는 협업에 대한 고민이 있다면 편하게 질문 남겨주세요~</AskSubtitle>
                </div>
              ) : (
                <div>
                  <AskTitle>{profile?.name}에게 하고 싶은 질문이 있나요?</AskTitle>
                  <AskSubtitle>“저에게 궁금한게 있다면 편하게 남겨주세요~”</AskSubtitle>
                </div>
              )}
              <AskButton onClick={handleAskToMeClick}>질문 남기기</AskButton>
            </AskContainer>
          )}

          <InfoContainer style={{ gap: '30px' }}>
            <InfoItem label='생년월일' content={convertBirthdayFormat(profile?.birthday)} />
            <InfoItem label='사는 지역' content={profile?.address ?? ''} />
            <InfoItem label='학교 / 전공' content={`${profile?.university ?? ''} ${profile?.major ?? ''}`} />
          </InfoContainer>

          <InfoContainer style={{ gap: '34px' }}>
            {profile?.activities.map((item, idx) => {
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
