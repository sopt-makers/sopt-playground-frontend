import styled from '@emotion/styled';
import * as Dialog from '@radix-ui/react-dialog';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, ReactNode, useState } from 'react';

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

const RIGHT_ARROW_SVG = (
  <svg width='8' height='16' viewBox='0 0 8 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M1 1L7 8.00029L1 15' stroke='#989BA0' strokeWidth='1.25' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const DEFAULT_PROFILE_IMAGE_SVG = (
  <svg width='18' height='22' viewBox='0 0 18 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g filter='url(#filter0_b_1414_9437)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.81167 5.88596C3.81167 8.7661 6.11975 11.0742 8.99988 11.0742C11.879 11.0742 14.1881 8.7661 14.1881 5.88596C14.1881 3.00583 11.879 0.697754 8.99988 0.697754C6.11975 0.697754 3.81167 3.00583 3.81167 5.88596ZM17.6467 17.6301C17.6467 14.5982 13.6634 13.8397 8.99972 13.8397C4.31069 13.8397 0.352703 14.6244 0.352703 17.6586C0.352703 20.6905 4.33602 21.449 8.99972 21.449C13.6887 21.449 17.6467 20.6644 17.6467 17.6301Z'
        fill='#606265'
      />
    </g>
    <defs>
      <filter
        id='filter0_b_1414_9437'
        x='-3.01678'
        y='-2.67181'
        width='24.0331'
        height='27.4903'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feGaussianBlur in='BackgroundImageFix' stdDeviation='1.68478' />
        <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_1414_9437' />
        <feBlend mode='normal' in='SourceGraphic' in2='effect1_backgroundBlur_1414_9437' result='shape' />
      </filter>
    </defs>
  </svg>
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
                {profileImage ? <ResizedImage src={profileImage} width={32} alt='' /> : DEFAULT_PROFILE_IMAGE_SVG}
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
            <NavLink href={playgroundLink.groupList()} isActive={pathMatch(playgroundLink.groupList())} onClick={close}>
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

const NavLink = styled(Link)<{ isActive?: boolean }>`
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
