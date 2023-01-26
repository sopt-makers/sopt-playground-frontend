import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import useAuth from '@/components/auth/useAuth';
import Footer from '@/components/common/Footer';
import ProperHeader from '@/components/common/Header/ProperHeader';
import AboutMakers from '@/components/makers/AboutMakers';
import { makersGenerationsData } from '@/components/makers/data';
import MakersMembers from '@/components/makers/MakersMembers';
import { playgroundLink } from '@/constants/links';
import IconBack from '@/public/icons/icon-back.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const MakersPage: FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <ProperHeader />
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
        <StyledMakersMembers generations={makersGenerationsData} />
      </StyledMakersPage>
      <Footer />
    </>
  );
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
