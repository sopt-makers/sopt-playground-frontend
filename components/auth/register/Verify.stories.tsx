import { ComponentMeta, ComponentStory } from '@storybook/react';

import Verify from './Verify';

export default {
  component: Verify,
  parameters: {},
  decorators: [],
  argTypes: {
    byPhone: { control: false },
    byEmail: { control: false },
  },
} as ComponentMeta<typeof Verify>;

const Template: ComponentStory<typeof Verify> = (args) => <Verify {...args} />;

export const Default = Template.bind({});
Default.args = {
  byPhone: <div style={{ backgroundColor: '#a9d7b4', height: '100px' }}>byPhone</div>,
  byEmail: <div style={{ backgroundColor: '#a0abdd', height: '100px' }}>byEmail</div>,
};
Default.storyName = '기본';
