import { ComponentMeta } from '@storybook/react';

import useUserRoleMenu from '@/components/users/main/UserRoleMenu/useUserRoleMenu';

import UserRoleMenu from '.';

export default {
  component: UserRoleMenu,
} as ComponentMeta<typeof UserRoleMenu>;

export const Default = () => {
  const { menuValue, onSelect } = useUserRoleMenu();

  return <UserRoleMenu value={menuValue} onSelect={onSelect} />;
};
Default.storyName = '기본';
