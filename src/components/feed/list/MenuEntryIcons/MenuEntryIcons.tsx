import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Flex } from '@toss/emotion-utils';
import Link from 'next/link';
import { playgroundLink } from 'playground-common/export';
import { ReactNode } from 'react';

import { CoffeeChatIcon, CrewIcon, MemberIcon, ProjectIcon } from '@/components/feed/list/MenuEntryIcons/Icons';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MenuEntry {
  icon: ReactNode;
  label: string;
  href: string;
}

const MENU_ENTRY_LIST: MenuEntry[] = [
  { icon: <CrewIcon />, label: '모임', href: playgroundLink.groupList() },
  { icon: <MemberIcon />, label: '멤버', href: playgroundLink.memberList() },
  { icon: <ProjectIcon />, label: '프로젝트', href: playgroundLink.projectList() },
  { icon: <CoffeeChatIcon />, label: '커피솝', href: playgroundLink.coffeechat() },
];

interface MenuEntryIconsProps {
  className?: string;
}

const MenuEntryIcons = ({ className }: MenuEntryIconsProps) => {
  return (
    <StyledMenuEntryIcons className={className} align='center' justify='center'>
      {MENU_ENTRY_LIST.map((menu) => (
        <MenuIcon key={menu.label} icon={menu.icon} label={menu.label} href={menu.href} />
      ))}
    </StyledMenuEntryIcons>
  );
};

const StyledMenuEntryIcons = styled(Flex)`
  width: 100%;
  @media ${MOBILE_MEDIA_QUERY} {
    gap: 20px;
  }
`;

export default MenuEntryIcons;

interface MenuIconProps {
  icon: ReactNode;
  label: string;
  href: string;
}

const MenuIcon = ({ label, icon, href }: MenuIconProps) => {
  return (
    <MenuIconWrapper href={href}>
      <MenuIconBox>{icon}</MenuIconBox>
      <MenuLabel>{label}</MenuLabel>
    </MenuIconWrapper>
  );
};

const MenuIconWrapper = styled(Link)`
  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: ${colors.gray800};
    }
  }
`;

const MenuIconBox = styled.div`
  border-radius: 12px;
  background-color: ${colors.gray900};
  padding: 8px;
  height: 46px;
`;

const MenuLabel = styled.div`
  @media ${MOBILE_MEDIA_QUERY} {
    white-space: nowrap;
    ${fonts.TITLE_14_SB}
  }
`;
