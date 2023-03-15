import { ComponentMeta, ComponentStory } from '@storybook/react';

import ByPhone from './ByPhone';

export default {
  component: ByPhone,
  parameters: {},
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '420px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ByPhone>;

const Template: ComponentStory<typeof ByPhone> = (args) => <ByPhone {...args} />;

export const Default = Template.bind({});
Default.args = {
  status: 'init',
  highlightHelp: false,
};

export const Sent = Template.bind({});
Sent.args = {
  status: 'sent',
};
