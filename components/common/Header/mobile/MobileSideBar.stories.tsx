import { ComponentMeta, ComponentStory } from '@storybook/react';

import MobileSideBar from '@/components/common/Header/mobile/MobileSideBar';

export default {
  component: MobileSideBar,
} as ComponentMeta<typeof MobileSideBar>;

const Template: ComponentStory<typeof MobileSideBar> = (args) => (
  <MobileSideBar {...args}>
    <button>open</button>
  </MobileSideBar>
);

export const Basic = Template.bind({});
Basic.args = {
  name: '박건영',
};
