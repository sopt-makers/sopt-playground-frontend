import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import ProfileButton from '@/components/common/Header/desktop/ProfileButton';
import ProfileDropdown from '@/components/common/Header/desktop/ProfileDropdown';
import { SOPT_LOGO_IMG_BASE64 } from '@/components/common/Header/imageData';
import { LinkRenderer, PathMatcher } from '@/components/common/Header/types';
import { playgroundLink } from '@/constants/links';
import { textStyles } from '@/styles/typography';

interface DesktopHeaderProps {
  user: {
    id: string;
    name: string;
    image?: string;
  } | null;

  onLogout?: () => void;
  renderLink: LinkRenderer;
  activePathMatcher: PathMatcher;
}

const DesktopHeader: FC<DesktopHeaderProps> = ({ user, onLogout, renderLink, activePathMatcher }) => {
  return (
    <Container>
      <StyledBrandLink>
        {renderLink({ href: playgroundLink.memberList(), children: <img src={SOPT_LOGO_IMG_BASE64} alt='SOPT' /> })}
      </StyledBrandLink>
      <NavArea>
        {renderLink({
          href: playgroundLink.memberList(),
          children: <NavItem isActive={activePathMatcher(playgroundLink.memberList())}>멤버</NavItem>,
        })}
        {renderLink({
          href: playgroundLink.projectList(),
          children: <NavItem isActive={activePathMatcher(playgroundLink.projectList())}>프로젝트</NavItem>,
        })}
        {renderLink({
          href: playgroundLink.groupList(),
          children: <NavItem isActive={activePathMatcher(playgroundLink.groupList())}>모임</NavItem>,
        })}
        <NavItem isActive={false}>|</NavItem>
        {renderLink({
          href: playgroundLink.sopticle(),
          children: <NavItem isActive={activePathMatcher(playgroundLink.sopticle())}>솝티클</NavItem>,
        })}
      </NavArea>
      <ActionArea>
        <ProfileButtonHolder>
          <ProfileDropdown
            myProfileHref={user ? playgroundLink.memberDetail(user.id) : ''}
            onLogout={onLogout}
            renderLink={renderLink}
          >
            {user ? <ProfileButton name={user.name} profileImage={user.image} /> : <ProfileButton name='' />}
          </ProfileDropdown>
        </ProfileButtonHolder>
      </ActionArea>
    </Container>
  );
};

export default DesktopHeader;

const Container = styled.header`
  display: flex;
  background-color: ${colors.gray900};
  height: 80px;
  color: ${colors.gray10};
`;

const StyledBrandLink = styled.div`
  margin: 0 44px;

  & > * {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

const NavArea = styled.nav`
  display: flex;
  flex-grow: 1;

  * > & {
    height: 100%;
  }
`;

const NavItem = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 100%;
  color: ${(props) => (props.isActive ? colors.gray10 : colors.gray500)};

  ${(props) =>
    props.isActive
      ? css`
          ${textStyles.SUIT_18_B}
        `
      : css`
          ${textStyles.SUIT_18_M}
        `}
`;

const ActionArea = styled.div`
  display: flex;
  align-items: center;
  padding-right: 30px;
`;

const ProfileButtonHolder = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;
