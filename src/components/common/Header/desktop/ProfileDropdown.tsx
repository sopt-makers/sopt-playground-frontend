import styled from '@emotion/styled';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import dynamic from 'next/dynamic';
import { FC, ReactNode, useState } from 'react';

import { LinkRenderer } from '@/components/common/Header/types';
import { legacyColors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

const DropdownPortal = dynamic<DropdownMenu.DropdownMenuPortalProps>(
  () => import('@radix-ui/react-dropdown-menu').then((r) => r.DropdownMenuPortal),
  {
    ssr: false,
  },
);

interface ProfileDropdownProps {
  children: ReactNode;
  myProfileHref?: string;
  onLogout?: () => void;
  renderLink: LinkRenderer;
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({ children, myProfileHref = '#', onLogout, renderLink }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownPortal>
        <DropdownMenu.Content sideOffset={22} align='end' asChild>
          <ContentBox>
            <DropdownMenu.Item onClick={() => setOpen(false)} asChild>
              {renderLink({ href: myProfileHref, children: '내 프로필' })}
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={onLogout}>로그아웃</DropdownMenu.Item>
          </ContentBox>
        </DropdownMenu.Content>
      </DropdownPortal>
    </DropdownMenu.Root>
  );
};

export default ProfileDropdown;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  box-shadow: 0 10px 38px -10px rgb(22 23 24 / 35%), 0 10px 20px -15px rgb(22 23 24 / 20%);
  background: ${legacyColors.black60};
  padding: 12px 0;
  min-width: 176px;
  animation: slide-up-and-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  color: ${legacyColors.white};

  & > * {
    cursor: pointer;
    padding: 12px 20px;

    ${textStyles.SUIT_16_SB}

    &:focus, &:focus-visible, &:hover {
      outline: none;
      background-color: ${legacyColors.black40};
    }
  }

  @keyframes slide-up-and-fade {
    from {
      transform: translateY(2px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
