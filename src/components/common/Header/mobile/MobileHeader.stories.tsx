import { Meta, StoryFn } from '@storybook/react';
import Link from 'next/link';

import MobileHeader from '@/components/common/Header/mobile/MobileHeader';

export default {
  component: MobileHeader,
} as Meta<typeof MobileHeader>;

const Template: StoryFn<typeof MobileHeader> = (args) => (
  <MobileHeader
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
