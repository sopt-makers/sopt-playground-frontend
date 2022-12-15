import styled from '@emotion/styled';
import { FC } from 'react';

import MemberRoleMenuItem from '@/components/members/main/MemberRoleMenu/MemberRoleMenuItem';
import { colors } from '@/styles/colors';

export enum MenuValue {
  ALL = 0,
  PM,
  DESIGN,
  WEB,
  SERVER,
  ANDROID,
  iOS,
}
export interface Menu {
  icon: string;
  label: string;
  value: MenuValue;
}

export const MENUS: Menu[] = [
  {
    icon: '/icons/icon-all.svg',
    label: '전체',
    value: MenuValue.ALL,
  },
  {
    icon: '/icons/icon-pm.svg',
    label: 'PM',
    value: MenuValue.PM,
  },
  {
    icon: '/icons/icon-design.svg',
    label: '디자인',
    value: MenuValue.DESIGN,
  },
  {
    icon: '/icons/icon-webpart.svg',
    label: 'WEB',
    value: MenuValue.WEB,
  },
  {
    icon: '/icons/icon-server.svg',
    label: 'SERVER',
    value: MenuValue.SERVER,
  },
  {
    icon: '/icons/icon-android.svg',
    label: 'Android',
    value: MenuValue.ANDROID,
  },
  {
    icon: '/icons/icon-iOS.svg',
    label: 'iOS',
    value: MenuValue.iOS,
  },
];

interface UserRoleMenuProps {
  className?: string;
  value: MenuValue;
  onSelect: (menuValue: MenuValue) => void;
}

const MemberRoleMenu: FC<UserRoleMenuProps> = ({ className, value, onSelect }) => {
  return (
    <StyledMenu className={className}>
      {MENUS.map((menu) => (
        <MemberRoleMenuItem
          key={menu.value}
          menu={menu}
          isSelected={value === menu.value}
          onClick={() => onSelect(menu.value)}
        />
      ))}
    </StyledMenu>
  );
};

export default MemberRoleMenu;

const StyledMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 13px;
  border-radius: 6px;
  background-color: ${colors.black100};
  width: 235px;
`;
