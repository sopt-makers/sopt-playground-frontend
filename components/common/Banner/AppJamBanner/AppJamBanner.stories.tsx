import { ComponentMeta, ComponentStory } from '@storybook/react';

import AppJamBanner from './AppJamBanner';

export default {
  component: AppJamBanner,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof AppJamBanner>;

const Template: ComponentStory<typeof AppJamBanner> = (args) => <AppJamBanner {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
