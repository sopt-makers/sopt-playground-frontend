import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import ProfileButton from '@/components/common/Header/ProfileButton';
import ProfileDropdown from '@/components/common/Header/ProfileDropdown';
import { playgroundLink } from '@/constants/links';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface DesktopHeaderProps {
  userName: string;
  userImage: string;
}

const SOPT_LOGO_IMG_BASE64 =
  'data:image/png;base64,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';

const DesktopHeader: FC<DesktopHeaderProps> = ({ userName, userImage }) => {
  return (
    <Container>
      <StyledBrandLink href={playgroundLink.memberList()}>
        <img src={SOPT_LOGO_IMG_BASE64} alt='SOPT' />
      </StyledBrandLink>
      <MenuLinkArea>
        <MenuLink href={playgroundLink.memberList()}>멤버</MenuLink>
        <MenuLink href={playgroundLink.projectList()}>프로젝트</MenuLink>
        <MenuLink href={playgroundLink.groupList()}>모임</MenuLink>
      </MenuLinkArea>
      <ActionArea>
        <StyledUploadLink href={playgroundLink.projectUpload()}>+ 내 프로젝트 올리기</StyledUploadLink>
        <ProfileButtonHolder>
          <ProfileDropdown>
            <ProfileButton name={userName} profileImage={userImage} />
          </ProfileDropdown>
        </ProfileButtonHolder>
      </ActionArea>
    </Container>
  );
};

export default DesktopHeader;

const Container = styled.nav`
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

const MenuLink = styled(Link)<{ isCurrentPath?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: ${({ isCurrentPath }) => (isCurrentPath ? '#fff' : '#C0C5C9')};

  ${(props) =>
    props.isCurrentPath
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
