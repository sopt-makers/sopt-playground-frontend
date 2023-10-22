import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Link from 'next/link';
import { FC } from 'react';

import useAuth from '@/components/auth/useAuth';
import Header from '@/components/common/Header';
import { playgroundLink } from '@/constants/links';
import IconBack from '@/public/icons/icon-back.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const SwitchableHeader: FC = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
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
  );
};

export default SwitchableHeader;

const NotLoggedInHeader = styled.div`
  display: flex;
  align-items: stretch;
  margin: 0 30px;
  height: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
    background-color: ${colors.gray900};
    height: 60px;
  }
`;

const StyledBackIcon = styled(IconBack)``;

const BackLink = styled.a`
  display: flex;
  align-items: center;
  padding: 30px 8px;
`;
