import { ComponentMeta, ComponentStory } from '@storybook/react';

import ByEmailView from './ByEmailView';

export default {
  component: ByEmailView,
  parameters: {},
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '420px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ByEmailView>;

const Template: ComponentStory<typeof ByEmailView> = (args) => <ByEmailView {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'idle',
};
Default.storyName = '기본';
