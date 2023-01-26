import { ComponentMeta, ComponentStory } from '@storybook/react';

import MobileDrawer from '@/components/common/Header/MobileDrawer';

export default {
  component: MobileDrawer,
} as ComponentMeta<typeof MobileDrawer>;

const Template: ComponentStory<typeof MobileDrawer> = (args) => (
  <MobileDrawer {...args}>
    <button>open</button>
  </MobileDrawer>
);

export const Basic = Template.bind({});
Basic.args = {
  name: '박건영',
};
