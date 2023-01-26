import { ComponentMeta, ComponentStory } from '@storybook/react';

import MobileHeader from '@/components/common/Header/MobileHeader';

export default {
  component: MobileHeader,
} as ComponentMeta<typeof MobileHeader>;

const Template: ComponentStory<typeof MobileHeader> = (args) => <MobileHeader {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  userName: '박건영',
  userImage: '',
};
Basic.storyName = '기본';
