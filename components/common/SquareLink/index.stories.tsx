import { ComponentMeta, ComponentStory } from '@storybook/react';

import SquareLink from '@/components/common/SquareLink';

export default {
  components: SquareLink,
} as ComponentMeta<typeof SquareLink>;

const Template: ComponentStory<typeof SquareLink> = (args) => <SquareLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '기본 버튼',
  variant: 'default',
};

export const Primary = Template.bind({});
Primary.args = {
  children: '프라이머리 버튼',
  variant: 'primary',
};
