import { ComponentMeta, ComponentStory } from '@storybook/react';

import FullScreenLayout from '@/components/layout/FullScreenLayout';

export default {
  components: FullScreenLayout,
} as ComponentMeta<typeof FullScreenLayout>;

const Template: ComponentStory<typeof FullScreenLayout> = (args) => <FullScreenLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div style={{ backgroundColor: '#7d7d7d', textAlign: 'center', height: '100%' }}>Page Content</div>,
};
Default.storyName = '기본';
