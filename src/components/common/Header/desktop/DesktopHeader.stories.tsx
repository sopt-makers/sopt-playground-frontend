import { Meta, StoryFn } from '@storybook/react';
import Link from 'next/link';

import DesktopHeader from '@/components/common/Header/desktop/DesktopHeader';

export default {
  component: DesktopHeader,
} as Meta<typeof DesktopHeader>;

const Template: StoryFn<typeof DesktopHeader> = (args) => (
  <DesktopHeader
    {...args}
    renderLink={({ href, children }) => {
      return <Link href={href}>{children}</Link>;
    }}
    activePathMatcher={(path) => {
      return path.startsWith('/members');
    }}
  />
);

export const Basic = {
  render: Template,

  args: {
    user: {
      name: '박건영',
      id: '1',
    },
  },

  name: '기본',
};
