import { ComponentMeta, ComponentStory } from '@storybook/react';

import Success from './Success';

export default {
  component: Success,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof Success>;

const Template: ComponentStory<typeof Success> = (args) => <Success {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
