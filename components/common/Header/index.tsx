import styled from '@emotion/styled';
import Link from 'next/link';
import LogoIcon from 'public/icons/icon-logo.svg';
import MemberIcon from 'public/icons/icon-member-32.svg';
import { FC, useState } from 'react';

import useAuth from '@/components/auth/useAuth';

const Header: FC = () => {
  const { logout } = useAuth();
  const [isUserDropdownOpened, setIsUserDropdownOpened] = useState(false);
  const currentPath = window.location.pathname;

  return (
    <StyledHeader>
      <HeaderGroup>
        <Link href='/' passHref>
          <TextLinkButton isCurrentPath={currentPath === '/'}>
            <StyledLogo>
              <LogoIcon />
            </StyledLogo>
          </TextLinkButton>
        </Link>
        <Link href='/projects' passHref>
          <TextLinkButton isCurrentPath={currentPath === '/projects'}>프로젝트</TextLinkButton>
        </Link>
        <Link href='' passHref>
          <TextLinkButton isCurrentPath={currentPath === ''}>Web Product</TextLinkButton>
        </Link>
      </HeaderGroup>
      <HeaderGroup>
        <Link href='/projects/upload' passHref>
          <UploadButton>
            <span>+</span>내 프로젝트 올리기
          </UploadButton>
        </Link>

        <UserButton onClick={() => setIsUserDropdownOpened((e) => !e)}>
          <MemberIcon />
          <span>세글자</span>
        </UserButton>
      </HeaderGroup>

      {isUserDropdownOpened && (
        <UserDropdown>
          <div>내 프로필</div>
          <div onClick={logout}>로그아웃</div>
        </UserDropdown>
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 18px 36px;
  line-height: 100%;
  letter-spacing: -0.01em;
  font-size: 14px;
`;

const HeaderGroup = styled.div`
  display: flex;
  align-items: center;

  &:first-child {
    gap: 16px;
  }

  &:nth-child(2) {
    gap: 8px;
  }
`;

const StyledLogo = styled.div`
  margin-right: 40px;
  padding: 10px;
`;

const TextLinkButton = styled.a<{ isCurrentPath: boolean }>`
  cursor: pointer;
  color: ${({ isCurrentPath }) => (isCurrentPath ? '#fff' : '#C0C5C9')};
  font-weight: ${({ isCurrentPath }) => (isCurrentPath ? 700 : 500)};
`;

const UploadButton = styled.a`
  box-sizing: border-box;
  border-radius: 32px;
  background-color: #8040ff;
  cursor: pointer;
  padding: 12px 20px;
  height: 38px;
  font-weight: 700;

  & > span {
    margin-right: 4px;
    font-weight: 700;
  }
`;

const UserButton = styled.a`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 19px;
  background: #1c1d1e;
  cursor: pointer;
  padding: 3px 12px 3px 4px;
  height: 38px;
  font-weight: 700;

  & > span {
    width: 64px;
    text-align: center;
  }
`;

const UserDropdown = styled.div`
  box-sizing: border-box;
  display: flex;
  position: absolute;
  top: 80px;
  right: 36px;
  flex-direction: column;
  gap: 25px;
  border-radius: 14px;
  background: #272828;
  padding: 25px 20px;
  width: 176px;

  & > div {
    cursor: pointer;
  }
`;
