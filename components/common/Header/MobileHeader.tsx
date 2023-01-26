import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import { MENU_IMG_SVG, SOPT_LOGO_IMG_BASE64 } from '@/components/common/Header/data';
import MobileDrawer from '@/components/common/Header/MobileDrawer';
import { playgroundLink } from '@/constants/links';
import { colors } from '@/styles/colors';

interface MobileHeaderProps {
  userId: string;
  userName: string;
  userImage: string;
  onLogout?: () => void;
}

const MobileHeader: FC<MobileHeaderProps> = ({ userId, userName, userImage, onLogout }) => {
  return (
    <Container>
      <MobileDrawer
        name={userName}
        profileImage={userImage}
        myProfileHref={playgroundLink.memberDetail(userId)}
        onLogout={onLogout}
      >
        <NavButton>{MENU_IMG_SVG}</NavButton>
      </MobileDrawer>
      <StyledBrandLink href={playgroundLink.memberList()}>
        <img src={SOPT_LOGO_IMG_BASE64} alt='SOPT' />
      </StyledBrandLink>
    </Container>
  );
};

export default MobileHeader;

const Container = styled.nav`
  display: flex;
  background-color: ${colors.black100};
  padding: 0 16px;
  height: 56px;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 32px;
`;

const StyledBrandLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 64px;

  & > img {
    width: 52px;
  }
`;
