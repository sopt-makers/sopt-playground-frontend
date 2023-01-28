import styled from '@emotion/styled';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';

import { getMemberProfile } from '@/api/members';
import useAuth from '@/components/auth/useAuth';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import AboutMakers from '@/components/makers/AboutMakers';
import { makersGenerationsData } from '@/components/makers/data';
import MakersMembers from '@/components/makers/MakersMembers';
import { playgroundLink } from '@/constants/links';
import IconBack from '@/public/icons/icon-back.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MakersPageProps {
  memberMetadataList: { id: number; profileImage: string; currentCompany: string | null; generations: number[] }[];
}

const MakersPage: FC<MakersPageProps> = ({ memberMetadataList }) => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <Header />
      ) : (
        <NotLoggedInHeader>
          <Link href={playgroundLink.login()} passHref legacyBehavior>
            <BackLink>
              <StyledBackIcon />
              로그인하러 가기
            </BackLink>
          </Link>
        </NotLoggedInHeader>
      )}
      <StyledMakersPage>
        <AboutMakers />
        <StyledMakersMembers generations={makersGenerationsData} metadataList={memberMetadataList} />
      </StyledMakersPage>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<MakersPageProps> = async () => {
  const memberList = await getMemberProfile('');

  const memberMetadataList = memberList.map((member) => {
    const sortedCareers = member.careers.filter((career) => career.isCurrent);
    sortedCareers.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    const currentCompany = sortedCareers.length > 0 ? sortedCareers.at(-1)?.companyName ?? null : null;
    const generations = member.activities.map((value) => value.generation).sort((a, b) => a - b);

    return {
      id: member.id,
      profileImage: member.profileImage ?? '',
      currentCompany,
      generations,
    };
  });

  return {
    props: {
      memberMetadataList,
    },
  };
};

export default MakersPage;

const StyledMakersPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  padding-bottom: 100px;
`;

const StyledMakersMembers = styled(MakersMembers)`
  margin-top: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 48px;
  }
`;

const NotLoggedInHeader = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  align-items: stretch;
  margin: 0 30px;
  width: calc(100% - 30px);
  height: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
  }
`;

const StyledBackIcon = styled(IconBack)``;

const BackLink = styled.a`
  display: flex;
  align-items: center;
  padding: 30px 8px;
`;
