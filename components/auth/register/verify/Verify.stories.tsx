import { ComponentMeta, ComponentStory } from '@storybook/react';

import Verify from './Verify';

export default {
  component: Verify,
  parameters: {},
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '420px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Verify>;

const Template: ComponentStory<typeof Verify> = (args) => <Verify {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
