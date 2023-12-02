import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import { MENU_SVG, SOPT_MAKRES_LOGO_SVG } from '@/components/common/Header/imageData';
import MobileSideBar from '@/components/common/Header/mobile/MobileSideBar';
import { LinkRenderer, PathMatcher } from '@/components/common/Header/types';
import { playgroundLink } from '@/constants/links';

interface MobileHeaderProps {
  user: {
    id: string;
    name: string;
    image?: string;
  } | null;

  onLogout?: () => void;
  renderLink: LinkRenderer;
  activePathMatcher: PathMatcher;
}

const MobileHeader: FC<MobileHeaderProps> = ({ user, onLogout, renderLink, activePathMatcher }) => {
  return (
    <Container>
      <MobileSideBar
        name={user?.name ?? ''}
        profileImage={user?.image}
        myProfileHref={user ? playgroundLink.memberDetail(user.id) : '#'}
        onLogout={onLogout}
        renderLink={renderLink}
        activePathMatcher={activePathMatcher}
      >
        <NavButton>{MENU_SVG}</NavButton>
      </MobileSideBar>
      {renderLink({
        href: playgroundLink.feedList(),
        children: (
          <BrandButton>
            <SOPT_MAKRES_LOGO_SVG />
          </BrandButton>
        ),
      })}
      <FakeBox />
    </Container>
  );
};

export default MobileHeader;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.gray950};
  padding: 12px;
  height: 64px;
  color: ${colors.gray10};
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 32px;
`;

const BrandButton = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 100%;

  & > svg {
    width: 120px;
  }
`;

const FakeBox = styled.div`
  visibility: visible;
  width: 32px;
`;
