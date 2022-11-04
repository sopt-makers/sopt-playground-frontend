import { ComponentMeta } from '@storybook/react';

import useMemberRoleMenu from '@/components/members/main/MemberRoleMenu/useMemberRoleMenu';

import UserRoleMenu from '.';

export default {
  component: UserRoleMenu,
} as ComponentMeta<typeof UserRoleMenu>;

export const Default = () => {
  const { menuValue, onSelect } = useMemberRoleMenu();

  return <UserRoleMenu value={menuValue} onSelect={onSelect} />;
};
Default.storyName = '기본';
