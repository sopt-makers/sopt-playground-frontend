import { ComponentMeta } from '@storybook/react';

import useMemberRoleMenu from '@/components/members/main/MemberRoleMenu/useMemberRoleMenu';

import MemberRoleDropdown from './MemberRoleDropdown';

export default {
  component: MemberRoleDropdown,
} as ComponentMeta<typeof MemberRoleDropdown>;

export const Default = () => {
  const { menuValue, onSelect } = useMemberRoleMenu();

  return <MemberRoleDropdown value={menuValue} onSelect={onSelect} />;
};
Default.storyName = '기본';
