import { ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import { menuValue } from '@/components/members/main/MemberList/MemberRoleMenu/constants';
import { MemberRoleMenu } from '@/components/members/main/MemberList/MemberRoleMenu/MemberRoleMenu';

export default {
  component: MemberRoleMenu,
} as ComponentMeta<typeof MemberRoleMenu>;

export const Default = () => {
  const [value, setValue] = useState<string>(menuValue.ALL);

  return <MemberRoleMenu value={value} onSelect={setValue} />;
};
Default.storyName = '기본';
