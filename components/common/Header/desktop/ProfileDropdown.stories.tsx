import { ComponentMeta, ComponentStory } from '@storybook/react';
import Link from 'next/link';

import ProfileDropdown from '@/components/common/Header/desktop/ProfileDropdown';

export default {
  component: ProfileDropdown,
} as ComponentMeta<typeof ProfileDropdown>;

const Template: ComponentStory<typeof ProfileDropdown> = (args) => (
  <ProfileDropdown
    {...args}
    renderLink={({ href, children }) => {
      return <Link href={href}>{children}</Link>;
    }}
  >
    <button>open</button>
  </ProfileDropdown>
);

export const Basic = Template.bind({});
Basic.args = {};
