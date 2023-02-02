import { ComponentMeta, ComponentStory } from '@storybook/react';
import Link from 'next/link';

import MobileSideBar from '@/components/common/Header/mobile/MobileSideBar';

export default {
  component: MobileSideBar,
} as ComponentMeta<typeof MobileSideBar>;

const Template: ComponentStory<typeof MobileSideBar> = (args) => (
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

export const Basic = Template.bind({});
Basic.args = {
  name: '박건영',
};
