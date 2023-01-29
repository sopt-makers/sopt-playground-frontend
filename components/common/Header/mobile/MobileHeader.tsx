import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import { MENU_SVG, SOPT_LOGO_IMG_BASE64 } from '@/components/common/Header/imageData';
import MobileSideBar from '@/components/common/Header/mobile/MobileSideBar';
import { playgroundLink } from '@/constants/links';
import { colors } from '@/styles/colors';

interface MobileHeaderProps {
  user: {
    id: string;
    name: string;
    image?: string;
  } | null;

  onLogout?: () => void;
}

const MobileHeader: FC<MobileHeaderProps> = ({ user, onLogout }) => {
  return (
    <Container>
      <MobileSideBar
        name={user?.name ?? ''}
        profileImage={user?.image}
        myProfileHref={user ? playgroundLink.memberDetail(user.id) : '#'}
        onLogout={onLogout}
      >
        <NavButton>{MENU_SVG}</NavButton>
      </MobileSideBar>
      <StyledBrandLink href={playgroundLink.memberList()}>
        <img src={SOPT_LOGO_IMG_BASE64} alt='SOPT' />
      </StyledBrandLink>
    </Container>
  );
};

export default MobileHeader;

const Container = styled.header`
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
