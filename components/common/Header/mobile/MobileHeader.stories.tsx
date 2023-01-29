import { ComponentMeta, ComponentStory } from '@storybook/react';

import MobileHeader from '@/components/common/Header/mobile/MobileHeader';

export default {
  component: MobileHeader,
} as ComponentMeta<typeof MobileHeader>;

const Template: ComponentStory<typeof MobileHeader> = (args) => <MobileHeader {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  user: {
    name: '박건영',
    id: '1',
  },
};
Basic.storyName = '기본';
