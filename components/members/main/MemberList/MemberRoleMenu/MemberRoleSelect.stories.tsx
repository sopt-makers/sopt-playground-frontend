import { Meta } from '@storybook/react';
import { useState } from 'react';

import { menuValue } from '@/components/members/main/MemberList/MemberRoleMenu/constants';

import { MemberRoleSelect } from './MemberRoleSelect';

export default {
  component: MemberRoleSelect,
} as Meta<typeof MemberRoleSelect>;

export const Default = {
  args: {},
  name: '기본',
};

export const WithState = () => {
  const [value, setValue] = useState<string>(menuValue.ALL);

  return <MemberRoleSelect value={value} onChange={setValue} />;
};
