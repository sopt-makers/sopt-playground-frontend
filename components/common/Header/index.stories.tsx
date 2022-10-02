import { ComponentMeta, ComponentStory } from '@storybook/react';

import Header from '@/components/common/Header';

export default {
  component: Header,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.storyName = '기본';
