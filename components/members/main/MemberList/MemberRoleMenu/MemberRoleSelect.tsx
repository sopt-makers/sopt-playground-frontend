import styled from '@emotion/styled';
import React, { FC } from 'react';

import Select from '@/components/members/common/select/Select';
import { MENUS } from '@/components/members/main/MemberList/MemberRoleMenu/constants';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberRoleSelectProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}
/**
 *
 * @description 해당 컴포넌트는 /members 페이지의 모바일 반응형 화면에서만 사용됩니다.
 */
export const MemberRoleSelect: FC<MemberRoleSelectProps> = ({ className, value, onChange }) => {
  return (
    <StyledSelect className={className} value={value} onChange={onChange}>
      {MENUS.map((menu) => (
        <Select.Item key={menu.value} value={menu.value}>
          <StyledContent>
            <StyledIcon src={menu.icon} alt={`${menu.label}-icon`} />
            {menu.label}
          </StyledContent>
        </Select.Item>
      ))}
    </StyledSelect>
  );
};

const StyledSelect = styled(Select)`
  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 14px;
    padding: 18px;

    ${textStyles.SUIT_16_B};
  }
`;

const StyledIcon = styled.img`
  width: 16px;
`;

const StyledContent = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
