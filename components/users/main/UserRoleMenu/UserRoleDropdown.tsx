import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, useState } from 'react';

import { MENUS, MenuValue } from '@/components/users/main/UserRoleMenu';
import UserRoleMenuItem from '@/components/users/main/UserRoleMenu/UserRoleMenuItem';
import { colors } from '@/styles/colors';

interface UserRoleDropdownProps {
  className?: string;
  value: MenuValue;
  onSelect: (menuValue: MenuValue) => void;
}

const UserRoleDropdown: FC<UserRoleDropdownProps> = ({ className, value, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentMenuValue, setCurrentMenuValue] = useState<MenuValue>(value);
  const filteredMenus = MENUS.filter((menu) => currentMenuValue !== menu.value);
  const currentMenu = MENUS.find((menu) => menu.value === currentMenuValue) ?? MENUS[0];

  const onToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  const handleSelect = (menuValue: MenuValue) => {
    if (currentMenuValue !== menuValue) {
      setCurrentMenuValue(menuValue);
    }
    onSelect(menuValue);
    onToggle();
  };

  return (
    <StyledDropdown className={className}>
      <UserRoleMenuItem
        menu={currentMenu}
        onClick={() => handleSelect(currentMenuValue)}
        suffix={
          <StyledIconArrow
            src='/icons/icon-arrow-down.svg'
            alt='icon-arrow'
            aria-label={isOpen ? 'opened' : 'closed'}
            isOpen={isOpen}
          />
        }
      />
      {isOpen &&
        filteredMenus.map((menu) => (
          <UserRoleMenuItem key={menu.value} menu={menu} onClick={() => handleSelect(menu.value)} />
        ))}
    </StyledDropdown>
  );
};

export default UserRoleDropdown;

const StyledDropdown = styled.ul`
  border-radius: 14px;
  background-color: ${colors.black80};
  width: 335px;
`;

const StyledIconArrow = styled.img<{ isOpen?: boolean }>`
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(-180deg);
    `};

  transition: transform 0.3s;
`;
