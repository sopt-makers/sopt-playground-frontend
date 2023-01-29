import styled from '@emotion/styled';
import * as Dialog from '@radix-ui/react-dialog';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, ReactNode, useState } from 'react';

import { DEFAULT_PROFILE_IMAGE_MOBILE_SVG, RIGHT_ARROW_SVG } from '@/components/common/Header/imageData';
import ResizedImage from '@/components/common/ResizedImage';
import { FEEDBACK_FORM_URL, playgroundLink } from '@/constants/links';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

const DialogPortal = dynamic<Dialog.DialogPortalProps>(
  () => import('@radix-ui/react-dialog').then((r) => r.DialogPortal),
  {
    ssr: false,
  },
);

interface MobileSideBarProps {
  children: ReactNode;
  name: string;
  myProfileHref?: string;
  profileImage?: string;
  onLogout?: () => void;
}

const MobileSideBar: FC<MobileSideBarProps> = ({ children, myProfileHref = '#', onLogout, name, profileImage }) => {
  const router = useRouter();
  const pathMatch = (path: string) => router.pathname?.includes(path) ?? false;

  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <DialogPortal>
        <Dialog.Overlay asChild>
          <Overlay />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <Content>
            <ProfileButton href={myProfileHref} onClick={() => setOpen(false)}>
              <ProfileImageSlot>
                {profileImage ? (
                  <ResizedImage src={profileImage} width={32} alt='' />
                ) : (
                  DEFAULT_PROFILE_IMAGE_MOBILE_SVG
                )}
              </ProfileImageSlot>
              <ProfileNameSlot>{name}</ProfileNameSlot>
              <ProfileArrowSlot>{RIGHT_ARROW_SVG}</ProfileArrowSlot>
            </ProfileButton>
            <NavLink
              href={playgroundLink.memberList()}
              isActive={pathMatch(playgroundLink.memberList())}
              onClick={close}
            >
              멤버
            </NavLink>
            <NavLink
              href={playgroundLink.projectList()}
              isActive={pathMatch(playgroundLink.projectList())}
              onClick={close}
            >
              프로젝트
            </NavLink>
            <NavLink
              as='a'
              href={playgroundLink.groupList()}
              isActive={pathMatch(playgroundLink.groupList())}
              onClick={close}
            >
              모임
            </NavLink>
            <Divider />
            <Link href={playgroundLink.makers()} legacyBehavior passHref>
              <NavLinkSmall as='a' isActive={pathMatch(playgroundLink.makers())} onClick={close}>
                만든 사람들
              </NavLinkSmall>
            </Link>
            <Link href={FEEDBACK_FORM_URL} legacyBehavior passHref target='_blank'>
              <NavLinkSmall as='a' onClick={close}>
                의견 제안하기
              </NavLinkSmall>
            </Link>
            <NavLinkSmall
              onClick={() => {
                onLogout?.();
                close();
              }}
            >
              로그아웃
            </NavLinkSmall>
          </Content>
        </Dialog.Content>
      </DialogPortal>
    </Dialog.Root>
  );
};

export default MobileSideBar;

const Overlay = styled.div`
  position: fixed;
  background-color: rgb(0 0 0 / 70%);
  animation: overlay-show 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  inset: 0;

  @keyframes overlay-show {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

const Content = styled.div`
  --x-gap: 20px;

  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  z-index: 100001;
  background-color: ${colors.black80};
  width: 212px;
  height: 100vh;
  overflow-y: auto;
  animation: content-show 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes content-show {
    from {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(0);
    }
  }
`;

const ProfileButton = styled(Link)`
  display: flex;
  margin-top: 45px;
  margin-bottom: 26px;
  padding: 10px var(--x-gap);
`;

const ProfileImageSlot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: ${colors.black60};
  width: 42px;
  height: 42px;
  overflow: hidden;
`;

const ProfileNameSlot = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  margin-left: 12px;
  line-height: 20px;

  ${textStyles.SUIT_20_B};
`;

const ProfileArrowSlot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
`;

const NavLink = styled(Link, { shouldForwardProp: (propName) => propName !== 'isActive' && propName !== 'as' })<{
  isActive?: boolean;
}>`
  padding: 10px var(--x-gap);
  color: ${(props) => (props.isActive ? colors.white : colors.gray30)};

  ${textStyles.SUIT_18_M};
`;

const NavLinkSmall = styled.div<{ isActive?: boolean }>`
  cursor: pointer;
  padding: 8px var(--x-gap);
  color: ${(props) => (props.isActive ? colors.white : colors.gray30)};

  ${textStyles.SUIT_14_M};
`;

const Divider = styled.div`
  margin: 26px var(--x-gap);
  border-top: 1px solid ${colors.black60};
  color: ${colors.black60};
`;
