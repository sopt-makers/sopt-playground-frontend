import { Meta, StoryFn } from '@storybook/react';
import Link from 'next/link';

import MobileSideBar from '@/components/common/Header/mobile/MobileSideBar';

export default {
  component: MobileSideBar,
} as Meta<typeof MobileSideBar>;

const Template: StoryFn<typeof MobileSideBar> = (args) => (
  <MobileSideBar
    {...args}
    renderLink={({ href, children }) => {
      return <Link href={href}>{children}</Link>;
    }}
    activePathMatcher={(path) => {
      return path.startsWith('/members');
    }}
  >
    <button>open</button>
  </MobileSideBar>
);

export const Basic = {
  render: Template,

  args: {
    name: '박건영',
  },
};
