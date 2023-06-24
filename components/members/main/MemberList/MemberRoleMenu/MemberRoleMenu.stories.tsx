import { Meta } from '@storybook/react';
import { useState } from 'react';

import { menuValue } from '@/components/members/main/MemberList/MemberRoleMenu/constants';
import { MemberRoleMenu } from '@/components/members/main/MemberList/MemberRoleMenu/MemberRoleMenu';

export default {
  component: MemberRoleMenu,
} as Meta<typeof MemberRoleMenu>;

export const Default = {
  render: function Render() {
    const [value, setValue] = useState<string>(menuValue.ALL);

    return <MemberRoleMenu value={value} onSelect={setValue} />;
  },

  name: '기본',
};
