import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import ProfileButton from '@/components/common/Header/desktop/ProfileButton';
import ProfileDropdown from '@/components/common/Header/desktop/ProfileDropdown';
import { SOPT_LOGO_IMG_BASE64 } from '@/components/common/Header/imageData';
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
}

const DesktopHeader: FC<DesktopHeaderProps> = ({ user, onLogout }) => {
  const router = useRouter();

  const pathMatch = (path: string) => router.pathname?.includes(path) ?? false;

  return (
    <Container>
      <StyledBrandLink href={playgroundLink.memberList()}>
        <img src={SOPT_LOGO_IMG_BASE64} alt='SOPT' />
      </StyledBrandLink>
      <MenuLinkArea>
        <MenuLink href={playgroundLink.memberList()} isActive={pathMatch(playgroundLink.memberList())}>
          멤버
        </MenuLink>
        <MenuLink href={playgroundLink.projectList()} isActive={pathMatch(playgroundLink.projectList())}>
          프로젝트
        </MenuLink>
        <MenuLink href={playgroundLink.groupList()} isActive={pathMatch(playgroundLink.groupList())}>
          모임
        </MenuLink>
      </MenuLinkArea>
      <ActionArea>
        <StyledUploadLink href={playgroundLink.projectUpload()}>+ 내 프로젝트 올리기</StyledUploadLink>
        <ProfileButtonHolder>
          <ProfileDropdown myProfileHref={user ? playgroundLink.memberDetail(user.id) : ''} onLogout={onLogout}>
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

const StyledBrandLink = styled(Link)`
  display: flex;
  align-items: center;
  margin: 0 44px;
`;

const MenuLinkArea = styled.nav`
  display: flex;
  flex-grow: 1;
`;

const MenuLink = styled(Link)<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: ${(props) => (props.isActive ? colors.white : colors.gray30)};

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

const StyledUploadLink = styled(Link)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  align-self: center;
  border-radius: 32px;
  background-color: #8040ff;
  padding: 12px 20px;
  height: 38px;

  ${textStyles.SUIT_14_B}
`;

const ProfileButtonHolder = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;
