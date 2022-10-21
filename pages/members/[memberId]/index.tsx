import styled from '@emotion/styled';
// import { useRouter } from 'next/router';
import CallIcon from 'public/icons/icon-call.svg';
import EditIcon from 'public/icons/icon-edit.svg';
import LinkIcon from 'public/icons/icon-link.svg';
import MailIcon from 'public/icons/icon-mail.svg';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import InfoItem from '@/components/members/detail/InfoItem';
import MemberProjectCard from '@/components/members/detail/MemberProjectCard';
import PartItem from '@/components/members/detail/PartItem';
import useGetProjectListQuery from '@/components/projects/upload/hooks/useGetProjectListQuery';
import { setLayout } from '@/utils/layout';

// TODO: 데이터 변경
const parts = [
  {
    imgSrc: '',
    year: '30기',
    part: '디자인 파트',
    appjam: {
      id: 1,
      name: '너가소개서',
    },
    sopkathon: {
      id: 1,
      name: '코잇',
    },
  },
  {
    imgSrc: '',
    year: '29기',
    part: '디자인 파트',
    appjam: {
      id: 1,
      name: '너가소개서',
    },
  },
  {
    imgSrc: '',
    year: '29기',
    part: '디자인 파트',
    other: {
      id: 1,
      name: '운영팀',
    },
  },
];

const MemberDetailPage: FC = () => {
  //   const router = useRouter();
  //   const { memberId } = router.query;

  // TODO: 데이터 변경
  const { data } = useGetProjectListQuery();

  return (
    <AuthRequired>
      <Container>
        <Wrapper>
          <ProfileContainer>
            <ProfileImage />
            <ProfileContents>
              <div>
                <NameWrapper>
                  <div className='name'>유예린</div>
                  <div className='part'>디자인 / 기획</div>
                </NameWrapper>
                <div className='intro'>행복을 찾는 UIUX 디자이너^^</div>
              </div>
              <ContactWrapper>
                <CallIcon />
                <div className='phone'>010-9122-3006</div>
                <MailIcon />
                <div className='email'>dbdPfls98@gmail.com</div>
              </ContactWrapper>
            </ProfileContents>

            <EditButton>
              <EditIcon />
            </EditButton>
          </ProfileContainer>

          <InfoContainer style={{ gap: '35px' }}>
            <InfoItem label='생년월일' content='1998년 07월 27일' />
            <InfoItem label='사는 지역' content='인천시 중구' />
            <InfoItem label='학교 / 전공' content='홍익대학교 시각디자인과' />
          </InfoContainer>

          <InfoContainer style={{ gap: '32px' }}>
            {parts.map((item, idx) => (
              <PartItem key={idx} {...item} />
            ))}
          </InfoContainer>

          <InfoContainer style={{ gap: '32px' }}>
            <InfoItem label='스킬' content='Node, Product Managing, Branding, UI' />
            <InfoItem
              label='링크'
              content={
                <LinkItems>
                  {[0, 0].map((_item, idx) => (
                    <div key={idx}>
                      <LinkIcon />
                      Linkedin
                    </div>
                  ))}
                </LinkItems>
              }
            />
          </InfoContainer>

          <ProjectContainer>
            <ProjectTitle>유예린님이 참여한 프로젝트</ProjectTitle>
            <ProjectSub>3개의 프로젝트에 참여</ProjectSub>
            <ProjectGrid>
              {data?.projects.map((project) => (
                <MemberProjectCard
                  key={project.id}
                  category={project.category}
                  summary={project.summary}
                  generation={project.generation}
                  logoImage={project.logo_image}
                  name={project.name}
                  serviceType={project.service_type}
                  thumbnailImage={project.thumbnail_image}
                />
              ))}
            </ProjectGrid>
          </ProjectContainer>
        </Wrapper>
      </Container>
    </AuthRequired>
  );
};

setLayout(MemberDetailPage, (page) => (
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
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 790px;
`;

const ProfileContainer = styled.div`
  display: flex;
  position: relative;
  gap: 33px;
  align-items: center;
  width: 100%;
  letter-spacing: -0.01em;
  font-weight: 500;
`;

const ProfileImage = styled.div`
  border-radius: 36px;
  background: #2c2d2e;
  width: 171px;
  height: 171px;
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
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;

  .name {
    line-height: 100%;
    font-size: 36px;
    font-weight: 700;
  }

  .part {
    line-height: 100%;
    color: #808388;
    font-size: 16px;
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  line-height: 100%;
  color: #808388;
  font-size: 14px;

  .phone {
    box-sizing: border-box;
    margin-right: 13px;
    border-right: 1.5px solid #3c3d40;
    padding-right: 17px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  background: #1c1d1e;
  padding: 40px;
  width: 100%;
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
  }
`;

const ProjectContainer = styled.div`
  margin-top: 110px;
`;

const ProjectTitle = styled.div`
  line-height: 100%;
  font-size: 32px;
  font-weight: 700;
`;

const ProjectSub = styled.div`
  margin-top: 18px;
  line-height: 100%;
  color: #989ba0;
  font-size: 22px;
  font-weight: 500;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 29px;
  margin-top: 60px;
  row-gap: 64px;
`;

export default MemberDetailPage;
