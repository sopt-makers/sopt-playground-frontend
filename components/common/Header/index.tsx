import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LogoIcon from 'public/icons/icon-logo.svg';
import MemberIcon from 'public/icons/icon-member.svg';
import MenuIcon from 'public/icons/icon-menu.svg';
import ProfileIcon from 'public/icons/icon-profile.svg';
import { FC, useEffect, useRef, useState } from 'react';

import { useGetMemberOfMe } from '@/apiHooks/members';
import useAuth from '@/components/auth/useAuth';
import { FEEDBACK_FORM_URL, playgroundLink } from '@/constants/links';
import BackIcon from '@/public/icons/icon-back.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const Header: FC = () => {
  const { logout } = useAuth();
  const { pathname, events } = useRouter();

  const [isUserDropdownOpened, setIsUserDropdownOpened] = useState(false);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const { data: me } = useGetMemberOfMe();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeDropdownHandler = (e: Event) => {
      if (!(e.target instanceof HTMLElement)) {
        return;
      }

      if (!dropdownButtonRef.current?.contains(e.target) && !dropdownRef.current?.contains(e.target)) {
        setIsUserDropdownOpened(false);
      }
      if (!mobileButtonRef.current?.contains(e.target) && !mobileMenuRef.current?.contains(e.target)) {
        setIsMobileMenuOpened(false);
      }
    };

    document.addEventListener('click', closeDropdownHandler);

    return () => {
      document.removeEventListener('click', closeDropdownHandler);
    };
  }, []);

  useEffect(() => {
    const closeDropdown = () => {
      setIsUserDropdownOpened(false);
      setIsMobileMenuOpened(false);
    };

    events.on('routeChangeStart', closeDropdown);

    return () => {
      events.off('routeChangeStart', closeDropdown);
    };
  }, [events]);

  return (
    <StyledHeader>
      <LeftGroup>
        <button ref={mobileButtonRef} className='mobile-only' onClick={() => setIsMobileMenuOpened(true)}>
          <MenuIcon />
        </button>
        <Link href={playgroundLink.memberList()} passHref legacyBehavior>
          <TextLinkButton isCurrentPath={pathname === '/'}>
            <StyledLogo>
              <LogoIcon />
            </StyledLogo>
          </TextLinkButton>
        </Link>

        <MenuGroup className='pc-only'>
          <Link href={playgroundLink.memberList()} passHref legacyBehavior>
            <TextLinkButton isCurrentPath={pathname === playgroundLink.memberList()}>멤버</TextLinkButton>
          </Link>
          <Link href={playgroundLink.projectList()} passHref legacyBehavior>
            <TextLinkButton isCurrentPath={pathname === playgroundLink.projectList()}>프로젝트</TextLinkButton>
          </Link>
          {/* <Link href='/web-product' passHref>
          <TextLinkButton isCurrentPath={router.pathname === ''}>Web Product</TextLinkButton>
        </Link> */}
        </MenuGroup>
      </LeftGroup>

      <RightGroup>
        <div className='pc-only'>
          <Link href={playgroundLink.projectUpload()} passHref legacyBehavior>
            <UploadButton>
              <span>+</span>내 프로젝트 올리기
            </UploadButton>
          </Link>
        </div>

        <UserButton ref={dropdownButtonRef} onClick={() => setIsUserDropdownOpened((e) => !e)}>
          <MemberIcon />
          <span>{me?.name}</span>
        </UserButton>
      </RightGroup>

      <UserDropdown ref={dropdownRef} isOpen={isUserDropdownOpened}>
        <Link href={me?.hasProfile ? playgroundLink.memberDetail(me.id) : playgroundLink.memberUpload()}>
          내 프로필
        </Link>
        <div onClick={logout}>로그아웃</div>
      </UserDropdown>

      <DimmedBackground isOpen={isMobileMenuOpened} onClick={() => setIsMobileMenuOpened(false)} />
      <MobileMenu isOpen={isMobileMenuOpened} ref={mobileMenuRef}>
        <Link
          href={me?.hasProfile ? playgroundLink.memberDetail(me.id) : playgroundLink.memberUpload()}
          passHref
          legacyBehavior
        >
          <ProfileContainer>
            {/* TODO: 프로필 있을 경우와 아닐 경우에 따라 분기처리 필요 */}
            <EmptyProfileImage>
              <ProfileIcon width={17.29} />
            </EmptyProfileImage>
            <Name>{me?.name}</Name>
            <Spacer />
            <StyledForwardIcon />
          </ProfileContainer>
        </Link>

        <RouterWrapper>
          <Link href={playgroundLink.memberList()} passHref legacyBehavior>
            <TextLinkButton isCurrentPath={pathname === playgroundLink.memberList()}>멤버</TextLinkButton>
          </Link>
          <Link href={playgroundLink.projectList()} passHref legacyBehavior>
            <TextLinkButton isCurrentPath={pathname === playgroundLink.projectList()}>프로젝트</TextLinkButton>
          </Link>
        </RouterWrapper>
        <Divider />
        <MenuWrapper>
          <Link href={playgroundLink.makers()} passHref legacyBehavior>
            <MenuLink highlight={pathname === playgroundLink.makers()}>만든 사람들</MenuLink>
          </Link>
          <MenuLink href={FEEDBACK_FORM_URL} target='_blank'>
            의견 제안하기
          </MenuLink>
          <MenuLink onClick={logout}>로그아웃</MenuLink>
        </MenuWrapper>
      </MobileMenu>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  position: relative;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  background-color: ${colors.black100};
  padding: 0 36px;
  height: 80px;
  line-height: 100%;
  letter-spacing: -0.01em;
  font-size: 14px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 12px;
    height: 56px;
    font-size: 12px;
  }
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
`;

const MenuGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const RightGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  @media ${MOBILE_MEDIA_QUERY} {
    visibility: collapse;
  }
`;

const StyledLogo = styled.div`
  margin-right: 40px;
  padding: 10px;
  @media ${MOBILE_MEDIA_QUERY} {
    svg {
      width: 49px;
      height: auto;
    }
  }
`;

const TextLinkButton = styled.a<{ isCurrentPath: boolean }>`
  cursor: pointer;
  color: ${({ isCurrentPath }) => (isCurrentPath ? '#fff' : '#C0C5C9')};
  font-weight: ${({ isCurrentPath }) => (isCurrentPath ? 700 : 500)};
  @media ${MOBILE_MEDIA_QUERY} {
    ${({ isCurrentPath }) => (isCurrentPath ? textStyles.SUIT_18_B : textStyles.SUIT_18_M)}
  }
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

const UserButton = styled.button`
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

  svg {
    width: 32px;
    height: auto;
  }

  & > span {
    width: 64px;
    text-align: center;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 3px 10px 3px 3px;
    height: 28px;

    svg {
      width: 22px;
    }

    & > span {
      width: 42px;
      text-align: center;
    }
  }
`;

const UserDropdown = styled.div<{ isOpen: boolean }>`
  box-sizing: border-box;
  display: flex;
  position: absolute;
  top: 80px;
  right: 36px;
  flex-direction: column;
  gap: 25px;
  transition: opacity 0.2s;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  z-index: 100;
  border-radius: 14px;
  background: #272828;
  padding: 25px 20px;
  width: 176px;
  font-size: 16px;

  & > div {
    cursor: pointer;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const DimmedBackground = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  background-color: rgb(0 0 0 / 70%);
  width: 100%;
  height: 100vh;

  ${(props) =>
    props.isOpen
      ? css``
      : css`
          visibility: hidden;
        `}
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s;
  z-index: 100001;
  background-color: ${colors.black80};
  padding: 57px 20px;
  width: 212px;
  height: 100vh;

  ${(props) =>
    props.isOpen
      ? css`
          transform: translateX(0);
        `
      : css`
          transform: translateX(-100%);
        `}
`;

const ProfileContainer = styled.a`
  display: flex;
  align-items: center;
`;

const EmptyProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: ${colors.black60};
  width: 42px;
  height: 42px;
`;

const Name = styled.div`
  margin-left: 12px;
  color: ${colors.white};
  ${textStyles.SUIT_20_B}
`;

const RouterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 30px;
  padding-bottom: 30px;
  color: ${colors.white100};
`;

const Divider = styled.div`
  border-bottom: 1px solid ${colors.black60};
`;

const MenuWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 21px;
`;

const MenuLink = styled.a<{ highlight?: boolean }>`
  cursor: pointer;
  color: ${colors.gray30};

  ${textStyles.SUIT_14_M}

  ${(props) =>
    props.highlight
      ? css`
          color: ${colors.white100};
          ${textStyles.SUIT_14_B}
        `
      : ''}
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const StyledForwardIcon = styled(BackIcon)`
  transform: rotate(180deg);
`;
