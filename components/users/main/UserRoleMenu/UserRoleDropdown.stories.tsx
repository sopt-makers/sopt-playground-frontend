import { ComponentMeta } from '@storybook/react';

import useUserRoleMenu from '@/components/users/main/UserRoleMenu/useUserRoleMenu';

import UserRoleDropdown from './UserRoleDropdown';

export default {
  component: UserRoleDropdown,
} as ComponentMeta<typeof UserRoleDropdown>;

export const Default = () => {
  const { menuValue, onSelect } = useUserRoleMenu();

  return <UserRoleDropdown value={menuValue} onSelect={onSelect} />;
};
Default.storyName = '기본';
