import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, useState } from 'react';

import { MENUS, MenuValue } from '@/components/members/main/MemberRoleMenu';
import MemberRoleMenuItem from '@/components/members/main/MemberRoleMenu/MemberRoleMenuItem';
import { colors } from '@/styles/colors';

interface MemberRoleDropdownProps {
  className?: string;
  value: MenuValue;
  onSelect: (menuValue: MenuValue) => void;
}
/**
 * @remarks 해당 컴포넌트는 모바일에서만 사용됩니다. 데스크톱에선 MemberRoleMenu를 사용해주세요.
 */
const MemberRoleDropdown: FC<MemberRoleDropdownProps> = ({ className, value, onSelect }) => {
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
      <MemberRoleMenuItem
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
      <StyledDropdownContent isOpen={isOpen}>
        {filteredMenus.map((menu) => (
          <MemberRoleMenuItem key={menu.value} menu={menu} onClick={() => handleSelect(menu.value)} />
        ))}
      </StyledDropdownContent>
    </StyledDropdown>
  );
};

export default MemberRoleDropdown;

const StyledDropdown = styled.div`
  z-index: 3;
  border-radius: 14px;
  background-color: ${colors.black100};
  width: 100%;
  min-width: 278px;
  height: 100%;
  position: relative;
`;

const StyledIconArrow = styled.img<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(-180deg);
    `};

  transition: transform 0.3s;
`;

const StyledDropdownContent = styled.ul<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  transition: height ease 0.5s;
  border-radius: inherit;
  background-color: inherit;
  height: ${({ isOpen }) => (isOpen ? 'auto' : 0)};
  width: 100%;
  overflow: hidden;
`;
