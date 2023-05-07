import { ComponentMeta, ComponentStory } from '@storybook/react';

import SOPTMATEBanner from '@/components/common/Banner/SOPTMATEBanner';

export default {
  component: SOPTMATEBanner,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof SOPTMATEBanner>;

const Template: ComponentStory<typeof SOPTMATEBanner> = (args) => <SOPTMATEBanner {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
