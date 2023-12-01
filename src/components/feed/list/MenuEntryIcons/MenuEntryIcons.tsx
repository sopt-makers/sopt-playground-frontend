import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Flex } from '@toss/emotion-utils';
import Link from 'next/link';
import { playgroundLink } from 'playground-common/export';
import { ReactNode } from 'react';

import Text from '@/components/common/Text';
import { CrewIcon, MemberIcon, ProjectIcon, WordchainIcon } from '@/components/feed/list/MenuEntryIcons/Icons';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MenuEntry {
  icon: ReactNode;
  label: string;
  href: string;
}

const MENU_ENTRY_LIST: MenuEntry[] = [
  { icon: <CrewIcon />, label: '모임', href: playgroundLink.groupList() },
  { icon: <MemberIcon />, label: '멤버', href: playgroundLink.memberList() },
  { icon: <ProjectIcon />, label: '프로젝트', href: playgroundLink.projectList() },
  { icon: <WordchainIcon />, label: '끝말잇기', href: playgroundLink.wordchain() },
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
    <MenuIconWrapper direction='column' align='center'>
      <Link href={href}>
        <StyledMenuIcon align='center' justify='center'>
          {icon}
        </StyledMenuIcon>
      </Link>
      <MenuLabel>{label}</MenuLabel>
    </MenuIconWrapper>
  );
};

const MenuIconWrapper = styled(Flex)`
  @media ${MOBILE_MEDIA_QUERY} {
    gap: 8px;
  }
`;

const StyledMenuIcon = styled(Flex)`
  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 14.67px;
    background-color: ${colors.gray700};
    width: 44px;
    height: 44px;
  }
`;

const MenuLabel = styled(Text)`
  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_13_M}
  }
`;
