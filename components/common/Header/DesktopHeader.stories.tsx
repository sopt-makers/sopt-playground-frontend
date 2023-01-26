import { ComponentMeta, ComponentStory } from '@storybook/react';

import DesktopHeader from '@/components/common/Header/DesktopHeader';

export default {
  component: DesktopHeader,
} as ComponentMeta<typeof DesktopHeader>;

const Template: ComponentStory<typeof DesktopHeader> = (args) => <DesktopHeader {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  userName: '박건영',
  userImage: '',
};
Basic.storyName = '기본';
