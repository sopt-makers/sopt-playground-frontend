import { ComponentMeta, ComponentStory } from '@storybook/react';

import EmptyLayout from '@/components/layout/EmptyLayout';

export default {
  components: EmptyLayout,
} as ComponentMeta<typeof EmptyLayout>;

const Template: ComponentStory<typeof EmptyLayout> = (args) => <EmptyLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div style={{ backgroundColor: '#7d7d7d', textAlign: 'center', height: '200px' }}>Page Content</div>,
};
Default.storyName = '기본';
