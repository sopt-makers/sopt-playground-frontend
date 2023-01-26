import { ComponentMeta, ComponentStory } from '@storybook/react';

import ProfileDropdown from '@/components/common/Header/desktop/ProfileDropdown';

export default {
  component: ProfileDropdown,
} as ComponentMeta<typeof ProfileDropdown>;

const Template: ComponentStory<typeof ProfileDropdown> = (args) => (
  <ProfileDropdown {...args}>
    <button>open</button>
  </ProfileDropdown>
);

export const Basic = Template.bind({});
Basic.args = {};
