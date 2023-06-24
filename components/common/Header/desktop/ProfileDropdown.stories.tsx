import { Meta, StoryFn } from '@storybook/react';
import Link from 'next/link';

import ProfileDropdown from '@/components/common/Header/desktop/ProfileDropdown';

export default {
  component: ProfileDropdown,
} as Meta<typeof ProfileDropdown>;

const Template: StoryFn<typeof ProfileDropdown> = (args) => (
  <ProfileDropdown
    {...args}
    renderLink={({ href, children }) => {
      return <Link href={href}>{children}</Link>;
    }}
  >
    <button>open</button>
  </ProfileDropdown>
);

export const Basic = {
  render: Template,
  args: {},
};
