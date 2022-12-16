import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import Text from '@/components/common/Text';
import { Menu } from '@/components/members/main/MemberRoleMenu';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberRoleMenuItemProps {
  menu: Menu;
  isSelected?: boolean;
  onClick: () => void;
  suffix?: ReactNode;
}

const MemberRoleMenuItem: FC<MemberRoleMenuItemProps> = ({ menu, isSelected, onClick, suffix }) => {
  return (
    <StyledMenuItem onClick={onClick} isSelected={isSelected}>
      <LeftSection>
        <StyledMenuItemIcon src={menu.icon} alt='role-icon' />
        <StyledMenuItemText isSelected={isSelected}>{menu.label}</StyledMenuItemText>
      </LeftSection>
      {suffix && <RightSection>{suffix}</RightSection>}
    </StyledMenuItem>
  );
};

export default MemberRoleMenuItem;

const StyledMenuItem = styled.li<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  }

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 14px;
    padding: 14px 18px;
    width: 335px;
  }
`;

const LeftSection = styled.section`
  display: flex;
  gap: 12px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 15px;
  }
`;

const RightSection = styled.section`
  display: flex;
`;

const StyledMenuItemIcon = styled.img`
  width: 17px;
`;

const StyledMenuItemText = styled(Text)<{ isSelected?: boolean }>`
  ${textStyles.SUIT_18_M}
  ${({ isSelected }) => isSelected && textStyles.SUIT_18_B}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_M}
    ${({ isSelected }) => isSelected && textStyles.SUIT_16_B}
  }
`;
