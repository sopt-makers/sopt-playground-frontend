import { ComponentMeta, ComponentStory } from '@storybook/react';

import DesktopHeader from '@/components/common/Header/desktop/DesktopHeader';

export default {
  component: DesktopHeader,
} as ComponentMeta<typeof DesktopHeader>;

const Template: ComponentStory<typeof DesktopHeader> = (args) => <DesktopHeader {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  user: {
    name: '박건영',
    id: '1',
  },
};
Basic.storyName = '기본';
