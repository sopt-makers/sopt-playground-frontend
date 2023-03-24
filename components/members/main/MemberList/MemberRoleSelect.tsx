import styled from '@emotion/styled';
import React, { FC } from 'react';

import Select from '@/components/members/common/select/Select';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export const menuValue = {
  ALL: '0',
  PM: '1',
  DESIGN: '2',
  WEB: '3',
  SERVER: '4',
  ANDROID: '5',
  iOS: '6',
} as const;

export const MENUS = [
  {
    icon: '/icons/icon-all.svg',
    label: '전체',
    value: menuValue.ALL,
  },
  {
    icon: '/icons/icon-pm.svg',
    label: 'PM',
    value: menuValue.PM,
  },
  {
    icon: '/icons/icon-design.svg',
    label: '디자인',
    value: menuValue.DESIGN,
  },
  {
    icon: '/icons/icon-webpart.svg',
    label: 'WEB',
    value: menuValue.WEB,
  },
  {
    icon: '/icons/icon-server.svg',
    label: 'SERVER',
    value: menuValue.SERVER,
  },
  {
    icon: '/icons/icon-android.svg',
    label: 'Android',
    value: menuValue.ANDROID,
  },
  {
    icon: '/icons/icon-iOS.svg',
    label: 'iOS',
    value: menuValue.iOS,
  },
];
interface MemberRoleSelectProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

const MemberRoleSelect: FC<MemberRoleSelectProps> = ({ className, value, onChange }) => {
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

export default MemberRoleSelect;

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
