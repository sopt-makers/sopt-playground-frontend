import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '@/components/common/Button';

export default {
  components: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

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
