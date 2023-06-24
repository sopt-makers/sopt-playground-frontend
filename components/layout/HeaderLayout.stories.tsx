import { ComponentMeta, ComponentStory } from '@storybook/react';

import HeaderLayout from '@/components/layout/HeaderLayout';

export default {
  component: HeaderLayout,
} as ComponentMeta<typeof HeaderLayout>;

const Template: ComponentStory<typeof HeaderLayout> = (args) => <HeaderLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div style={{ backgroundColor: '#7d7d7d', textAlign: 'center', height: '200px' }}>Page Content</div>,
};
Default.storyName = '기본';
