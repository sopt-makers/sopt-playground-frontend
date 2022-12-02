import { ComponentMeta, ComponentStory } from '@storybook/react';

import HeaderFooterLayout from '@/components/layout/HeaderFooterLayout';

export default {
  components: HeaderFooterLayout,
} as ComponentMeta<typeof HeaderFooterLayout>;

const Template: ComponentStory<typeof HeaderFooterLayout> = (args) => <HeaderFooterLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div style={{ backgroundColor: '#7d7d7d', textAlign: 'center', height: '200px' }}>Page Content</div>,
};
Default.storyName = '기본';
