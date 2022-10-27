import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC } from 'react';

import Text from '@/components/common/Text';
import { Menu } from '@/components/users/main/UserRoleMenu';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface UserRoleMenuItemProps {
  menu: Menu;
  isSelected?: boolean;
  onClick: () => void;
}

const UserRoleMenuItem: FC<UserRoleMenuItemProps> = ({ menu, isSelected, onClick }) => {
  return (
    <StyledMenuItem onClick={onClick} isSelected={isSelected}>
      <StyledMenuItemIcon src={menu.icon} alt='role-icon' />
      <StyledMenuItemText isSelected={isSelected}>{menu.label}</StyledMenuItemText>
    </StyledMenuItem>
  );
};

export default UserRoleMenuItem;

const StyledMenuItem = styled.li<{ isSelected?: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  transition: background-color 0.3s;
  border-radius: 16px;
  background-color: ${colors.black100};
  cursor: pointer;
  padding: 20px 21px;
  width: 100%;

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${colors.black80};
    `}

  &:hover {
    background-color: ${colors.black80};
    letter-spacing: -0.01em;
  }
`;

const StyledMenuItemIcon = styled.img`
  width: 26px;
`;

const StyledMenuItemText = styled(Text)<{ isSelected?: boolean }>`
  ${textStyles.SUIT_20_M}
  ${({ isSelected }) => isSelected && textStyles.SUIT_20_B}
`;
