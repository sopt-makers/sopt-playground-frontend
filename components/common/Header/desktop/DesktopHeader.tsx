import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC } from 'react';

import ProfileButton from '@/components/common/Header/desktop/ProfileButton';
import ProfileDropdown from '@/components/common/Header/desktop/ProfileDropdown';
import { SOPT_LOGO_IMG_BASE64 } from '@/components/common/Header/imageData';
import { LinkRenderer, PathMatcher } from '@/components/common/Header/types';
import { playgroundLink } from '@/constants/links';
import { colors } from '@/styles/colors';
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
        <NavItem isActive={activePathMatcher(playgroundLink.memberList())}>
          {renderLink({ href: playgroundLink.memberList(), children: '멤버' })}
        </NavItem>
        <NavItem isActive={activePathMatcher(playgroundLink.projectList())}>
          {renderLink({ href: playgroundLink.projectList(), children: '프로젝트' })}
        </NavItem>
        <NavItem isActive={activePathMatcher(playgroundLink.groupList())}>
          {renderLink({ href: playgroundLink.groupList(), children: '모임' })}
        </NavItem>
      </NavArea>
      <ActionArea>
        <StyledUploadLink>
          {renderLink({ href: playgroundLink.projectUpload(), children: '+ 내 프로젝트 올리기' })}
        </StyledUploadLink>
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
  background-color: ${colors.black100};
  height: 80px;
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
`;

const NavItem = styled.div<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? colors.white : colors.gray30)};

  & > * {
    display: flex;
    align-items: center;
    padding: 0 8px;
    height: 100%;
    color: ${(props) => (props.isActive ? colors.white : colors.gray30)};
  }

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
  padding-right: 30px;
`;

const StyledUploadLink = styled.div`
  align-self: center;

  & > * {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-radius: 32px;
    background-color: #8040ff;
    padding: 12px 20px;
    height: 38px;

    ${textStyles.SUIT_14_B}
  }
`;

const ProfileButtonHolder = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;
