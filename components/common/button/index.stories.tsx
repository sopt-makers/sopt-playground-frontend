import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from 'components/common/button';

export default {
  components: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};
