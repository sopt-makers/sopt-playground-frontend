import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { menuValue } from '@/components/members/main/MemberList/MemberRoleMenu/constants';

import { MemberRoleSelect } from './MemberRoleSelect';

export default {
  component: MemberRoleSelect,
} as ComponentMeta<typeof MemberRoleSelect>;

const Template: ComponentStory<typeof MemberRoleSelect> = (args) => <MemberRoleSelect {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';

export const WithState = () => {
  const [value, setValue] = useState<string>(menuValue.ALL);

  return <MemberRoleSelect value={value} onChange={setValue} />;
};
