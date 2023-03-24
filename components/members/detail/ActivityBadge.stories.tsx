import { ComponentMeta, ComponentStory } from '@storybook/react';

import ActivityBadge from './ActivityBadge';

export default {
  component: ActivityBadge,
  parameters: {},
  decorators: [
    (Story) => (
      <div style={{ display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ActivityBadge>;

const Template: ComponentStory<typeof ActivityBadge> = (args) => <ActivityBadge {...args} />;

export const Default = Template.bind({});
Default.args = {
  category: '앱잼',
  children: '너가소개서',
};

export const WithoutCategory = Template.bind({});
WithoutCategory.args = {
  children: '팀블',
};
