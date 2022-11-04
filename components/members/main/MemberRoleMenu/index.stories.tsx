import { ComponentMeta } from '@storybook/react';

import useMemberRoleMenu from '@/components/members/main/MemberRoleMenu/useMemberRoleMenu';

import MemberRoleMenu from '.';

export default {
  component: MemberRoleMenu,
} as ComponentMeta<typeof MemberRoleMenu>;

export const Default = () => {
  const { menuValue, onSelect } = useMemberRoleMenu();

  return <MemberRoleMenu value={menuValue} onSelect={onSelect} />;
};
Default.storyName = '기본';
