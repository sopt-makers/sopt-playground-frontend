import { ComponentMeta, ComponentStory } from '@storybook/react';

import ByPhoneView from './ByPhoneView';

export default {
  component: ByPhoneView,
  parameters: {},
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '420px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ByPhoneView>;

const Template: ComponentStory<typeof ByPhoneView> = (args) => <ByPhoneView {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'phoneReady',
  highlightHelp: false,
};

export const Sent = Template.bind({});
Sent.args = {};
