import { ComponentMeta, ComponentStory } from '@storybook/react';

import Stepper from './Stepper';

export default {
  component: Stepper,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof Stepper>;

const Template: ComponentStory<typeof Stepper> = (args) => <Stepper {...args} />;

export const Default = Template.bind({});
Default.args = {
  step: 1,
};
Default.storyName = '기본';
