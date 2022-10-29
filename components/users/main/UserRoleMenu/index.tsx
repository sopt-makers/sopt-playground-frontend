import styled from '@emotion/styled';
import { FC } from 'react';

import UserRoleMenuItem from '@/components/users/main/UserRoleMenu/UserRoleMenuItem';
import { colors } from '@/styles/colors';

export type MenuValue = 'all' | 'pm' | 'design' | 'ios' | 'web' | 'andriod';
export interface Menu {
  icon: string;
  label: string;
  value: MenuValue;
}

export const MENUS: Menu[] = [
  {
    icon: '/icons/icon-all.svg',
    label: '전체',
    value: 'all',
  },
  {
    icon: '/icons/icon-pm.svg',
    label: 'PM',
    value: 'pm',
  },
  {
    icon: '/icons/icon-design.svg',
    label: '디자인',
    value: 'design',
  },
  {
    icon: '/icons/icon-iOS.svg',
    label: 'iOS',
    value: 'ios',
  },
  {
    icon: '/icons/icon-webpart.svg',
    label: 'WEB',
    value: 'web',
  },
  {
    icon: '/icons/icon-android.svg',
    label: 'Android',
    value: 'andriod',
  },
];

interface UserRoleMenuProps {
  className?: string;
  value: MenuValue;
  onSelect: (menuValue: MenuValue) => void;
}

const UserRoleMenu: FC<UserRoleMenuProps> = ({ className, value, onSelect }) => {
  return (
    <StyledMenu className={className}>
      {MENUS.map((menu) => (
        <UserRoleMenuItem
          key={menu.value}
          menu={menu}
          isSelected={value === menu.value}
          onClick={() => onSelect(menu.value)}
        />
      ))}
    </StyledMenu>
  );
};

export default UserRoleMenu;

const StyledMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 13px;
  border-radius: 6px;
  background-color: ${colors.black100};
  width: 278px;
`;
