import { ComponentMeta, ComponentStory } from '@storybook/react';

import Register from '@/components/auth/register/Register';

export default {
  component: Register,
} as ComponentMeta<typeof Register>;

const Template: ComponentStory<typeof Register> = (args) => <Register {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  userInfo: {
    name: '박커비',
  },
};
Basic.storyName = '기본';
