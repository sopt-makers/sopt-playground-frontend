import { ComponentMeta, ComponentStory } from '@storybook/react';
import Link from 'next/link';

import MobileHeader from '@/components/common/Header/mobile/MobileHeader';

export default {
  component: MobileHeader,
} as ComponentMeta<typeof MobileHeader>;

const Template: ComponentStory<typeof MobileHeader> = (args) => (
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

export const Basic = Template.bind({});
Basic.args = {
  user: {
    name: '박건영',
    id: '1',
  },
};
Basic.storyName = '기본';
